// NOTE: We need to import these to be able to use the AskarWallet in this file.
import '@hyperledger/aries-askar-react-native'

import type { InitConfig } from '@aries-framework/core'
import type { IndyVdrPoolConfig } from '@aries-framework/indy-vdr'

import { AskarWallet } from '@aries-framework/askar'
import {
  Agent,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
  SigningProviderRegistry,
  WsOutboundTransport,
  type WalletConfig,
  type WalletExportImportConfig
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'

import { getAgentModules } from '../agent'

interface WalletImportConfigWithAgent {
  agentConfig: InitConfig
  importConfig: WalletExportImportConfig
  mediatorInvitationUrl: string
  indyNetworks: [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]
}

export const isWalletPinCorrect = async (walletConfig: WalletConfig) => {
  try {
    // NOTE: a custom wallet is used to check if the wallet key is correct. This is different from the wallet used in the rest of the app.
    // We create an AskarWallet instance and open the wallet with the given secret.
    const askarWallet = new AskarWallet(
      new ConsoleLogger(LogLevel.off),
      new agentDependencies.FileSystem(),
      new SigningProviderRegistry([])
    )
    await askarWallet.open(walletConfig)

    await askarWallet.close()
    return true
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error opening wallet', e)
    return false
  }
}

export const isWalletImportable = async (
  walletConfig: WalletConfig,
  importConfig: WalletExportImportConfig
): Promise<boolean> => {
  const fileSystem = new agentDependencies.FileSystem()
  try {
    const tempImportPath = fileSystem.tempPath + '/importTemp'
    // Add temp path to wallet config
    walletConfig.storage = {
      type: 'sqlite',
      path: tempImportPath
    }
    // NOTE: a custom wallet is used to check if the wallet passphrase is correct and can be imported successfully.
    const askarWallet = new AskarWallet(new ConsoleLogger(LogLevel.off), fileSystem, new SigningProviderRegistry([]))
    await askarWallet.import(walletConfig, importConfig)

    await fileSystem.delete(importConfig.path)
    return true
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error importing wallet', e)
    await fileSystem.delete(importConfig.path)
    return false
  }
}

export const importWalletWithAgent = async ({
  importConfig,
  agentConfig,
  mediatorInvitationUrl,
  indyNetworks
}: WalletImportConfigWithAgent) => {
  if (!agentConfig.walletConfig?.id || !agentConfig.walletConfig.key) {
    // Cannot find wallet id/key in agent config, so we cannot import the wallet
    return
  }

  if (!importConfig.key || !importConfig.path) {
    throw new Error('Please enter a valid passphrase')
  }

  const agent = new Agent({
    dependencies: agentDependencies,
    config: {
      autoUpdateStorageOnStartup: true,
      ...agentConfig
    },
    modules: getAgentModules(mediatorInvitationUrl, indyNetworks)
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.wallet.import(agentConfig.walletConfig, importConfig)

  await agent.wallet.initialize(agentConfig.walletConfig)

  await agent.initialize()

  return agent
}
