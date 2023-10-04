import type { InitConfig } from '@aries-framework/core'
import type { IndyVdrPoolConfig } from '@aries-framework/indy-vdr'

import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1CredentialProtocol,
  V1ProofProtocol
} from '@aries-framework/anoncreds'
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs'
import { AskarModule } from '@aries-framework/askar'
import {
  JwkDidRegistrar,
  JwkDidResolver,
  Agent,
  DidsModule,
  WebDidResolver,
  CredentialsModule,
  V2CredentialProtocol,
  ProofsModule,
  V2ProofProtocol,
  AutoAcceptProof,
  AutoAcceptCredential,
  MediationRecipientModule,
  HttpOutboundTransport,
  WsOutboundTransport,
  ConnectionsModule,
  MediatorPickupStrategy,
  JsonLdCredentialFormatService
} from '@aries-framework/core'
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
  IndyVdrSovDidResolver
} from '@aries-framework/indy-vdr'
import { PushNotificationsFcmModule } from '@aries-framework/push-notifications'
import { agentDependencies } from '@aries-framework/react-native'
import { anoncreds } from '@hyperledger/anoncreds-react-native'
import { ariesAskar } from '@hyperledger/aries-askar-react-native'
import { indyVdr } from '@hyperledger/indy-vdr-react-native'

export const getAgentModules = (
  mediatorInvitationUrl: string,
  indyNetworks: [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]
) => {
  return {
    askar: new AskarModule({
      ariesAskar
    }),
    anoncredsRs: new AnonCredsRsModule({
      anoncreds
    }),
    anoncreds: new AnonCredsModule({
      registries: [new IndyVdrAnonCredsRegistry()]
    }),
    mediationRecipient: new MediationRecipientModule({
      mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2,
      mediatorInvitationUrl: mediatorInvitationUrl
    }),
    dids: new DidsModule({
      registrars: [new JwkDidRegistrar()],
      resolvers: [new WebDidResolver(), new JwkDidResolver(), new IndyVdrSovDidResolver(), new IndyVdrIndyDidResolver()]
    }),
    indyVdr: new IndyVdrModule({
      indyVdr,
      networks: indyNetworks
    }),
    credentials: new CredentialsModule({
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
      credentialProtocols: [
        new V1CredentialProtocol({
          indyCredentialFormat: new LegacyIndyCredentialFormatService()
        }),
        new V2CredentialProtocol({
          credentialFormats: [
            new LegacyIndyCredentialFormatService(),
            new AnonCredsCredentialFormatService(),
            new JsonLdCredentialFormatService()
          ]
        })
      ]
    }),
    proofs: new ProofsModule({
      autoAcceptProofs: AutoAcceptProof.ContentApproved,
      proofProtocols: [
        new V1ProofProtocol({
          indyProofFormat: new LegacyIndyProofFormatService()
        }),
        new V2ProofProtocol({
          proofFormats: [new LegacyIndyProofFormatService(), new AnonCredsProofFormatService()]
        })
      ]
    }),
    connections: new ConnectionsModule({
      autoAcceptConnections: true
    }),
    pushNotificationsFcm: new PushNotificationsFcmModule()
  }
}

export const initializeAgent = async ({
  agentConfig,
  mediatorInvitationUrl,
  indyNetworks
}: {
  agentConfig: InitConfig
  mediatorInvitationUrl: string
  indyNetworks: [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]
}) => {
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

  await agent.initialize()

  return agent
}

export type AdeyaAgent = Awaited<ReturnType<typeof initializeAgent>>
