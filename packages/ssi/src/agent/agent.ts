import type { InitConfig } from '@credo-ts/core'
import type { AgentModulesInput } from '@credo-ts/core/build/agent/AgentModules'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'

import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
  DataIntegrityCredentialFormatService,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1CredentialProtocol,
  V1ProofProtocol
} from '@credo-ts/anoncreds'
import { AskarModule } from '@credo-ts/askar'
import {
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
  JsonLdCredentialFormatService,
  DifPresentationExchangeProofFormatService
} from '@credo-ts/core'
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
  IndyVdrSovDidResolver
} from '@credo-ts/indy-vdr'
import { PushNotificationsFcmModule } from '@credo-ts/push-notifications'
import { QuestionAnswerModule } from '@credo-ts/question-answer'
import { agentDependencies } from '@credo-ts/react-native'
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
    anoncreds: new AnonCredsModule({
      registries: [new IndyVdrAnonCredsRegistry()],
      anoncreds
    }),
    mediationRecipient: new MediationRecipientModule({
      mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2,
      mediatorInvitationUrl: mediatorInvitationUrl
    }),
    dids: new DidsModule({
      registrars: [],
      resolvers: [new WebDidResolver(), new IndyVdrSovDidResolver(), new IndyVdrIndyDidResolver()]
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
            new DataIntegrityCredentialFormatService(),
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
          proofFormats: [
            new LegacyIndyProofFormatService(),
            new AnonCredsProofFormatService(),
            new DifPresentationExchangeProofFormatService()
          ]
        })
      ]
    }),
    connections: new ConnectionsModule({
      autoAcceptConnections: true
    }),
    pushNotificationsFcm: new PushNotificationsFcmModule(),
    questionAnswer: new QuestionAnswerModule()
  }
}

export const initializeAgent = async ({
  agentConfig,
  modules
}: {
  agentConfig: InitConfig
  modules: AgentModulesInput
}) => {
  const agent = new Agent({
    dependencies: agentDependencies,
    config: {
      autoUpdateStorageOnStartup: true,
      ...agentConfig
    },
    modules
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()

  return agent
}
