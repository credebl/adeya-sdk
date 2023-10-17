import type { InitConfig } from '@aries-framework/core'

// Anoncreds
import {
  V1RequestPresentationMessage,
  AnonCredsCredentialOffer,
  AnonCredsCredentialsForProofRequest,
  AnonCredsRequestedAttributeMatch,
  AnonCredsRequestedPredicateMatch,
  AnonCredsNonRevokedInterval,
  AnonCredsProofRequestRestriction,
  AnonCredsProofFormat,
  AnonCredsProofFormatService,
  LegacyIndyProofFormat,
  LegacyIndyProofFormatService,
  AnonCredsPredicateType,
  AnonCredsProof,
  AnonCredsRequestedAttribute,
  AnonCredsRequestedPredicate,
  LegacyIndyProofRequest,
  AnonCredsProofRequest,
  AnonCredsModule,
  V1CredentialProtocol,
  LegacyIndyCredentialFormatService,
  AnonCredsCredentialFormatService,
  V1ProofProtocol
} from '@aries-framework/anoncreds'
import { AnonCredsCredentialMetadataKey } from '@aries-framework/anoncreds/build/utils/metadata'
// Core
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs'
import { AskarModule } from '@aries-framework/askar'
import {
  LogLevel,
  ConsoleLogger,
  BasicMessageRecord,
  ConnectionRecord,
  CredentialExchangeRecord,
  ProofExchangeRecord,
  ProofState,
  W3cCredentialRecord,
  DidExchangeState,
  OutOfBandRecord,
  CredentialState,
  CredentialPreviewAttribute,
  JsonLdFormatDataCredentialDetail,
  Buffer,
  BasicMessageRole,
  GetCredentialFormatDataReturn,
  ProofFormatPayload,
  AgentMessage,
  AutoAcceptProof,
  ConnectionType,
  MediationRecipientModule,
  MediatorPickupStrategy,
  DidsModule,
  JwkDidRegistrar,
  WebDidResolver,
  JwkDidResolver,
  CredentialsModule,
  AutoAcceptCredential,
  V2CredentialProtocol,
  JsonLdCredentialFormatService,
  ProofsModule,
  V2ProofProtocol,
  ConnectionsModule,
  Agent
} from '@aries-framework/core'
import {
  GetCredentialsForRequestReturn,
  ProofFormatDataMessagePayload
} from '@aries-framework/core/build/modules/proofs/protocol/ProofProtocolOptions'
// Indy VDR
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
  IndyVdrPoolConfig,
  IndyVdrSovDidResolver
} from '@aries-framework/indy-vdr'
import { PushNotificationsFcmModule } from '@aries-framework/push-notifications'

export * from './agent'
export * from './providers'
export * from './hooks'
export * from './wallet'
export * from './connections'
export * from './credentials'
export * from './proofs'
export * from './basicMessages'
export * from './pushNotifications'
// Core
export {
  LogLevel,
  ConsoleLogger,
  InitConfig,
  BasicMessageRecord,
  ConnectionRecord,
  OutOfBandRecord,
  CredentialExchangeRecord,
  W3cCredentialRecord,
  ProofExchangeRecord,
  ProofState,
  DidExchangeState,
  CredentialState,
  CredentialPreviewAttribute,
  JsonLdFormatDataCredentialDetail,
  Buffer,
  BasicMessageRole,
  GetCredentialFormatDataReturn,
  ProofFormatPayload,
  AgentMessage,
  AutoAcceptProof,
  ConnectionType,
  GetCredentialsForRequestReturn,
  ProofFormatDataMessagePayload,
  MediationRecipientModule,
  MediatorPickupStrategy,
  DidsModule,
  JwkDidRegistrar,
  WebDidResolver,
  JwkDidResolver,
  CredentialsModule,
  AutoAcceptCredential,
  V2CredentialProtocol,
  JsonLdCredentialFormatService,
  ProofsModule,
  V2ProofProtocol,
  ConnectionsModule,
  Agent
}
// Anoncreds
export {
  V1RequestPresentationMessage,
  AnonCredsCredentialOffer,
  AnonCredsCredentialsForProofRequest,
  AnonCredsRequestedAttributeMatch,
  AnonCredsRequestedPredicateMatch,
  AnonCredsNonRevokedInterval,
  AnonCredsProofRequestRestriction,
  AnonCredsProofFormat,
  AnonCredsProofFormatService,
  LegacyIndyProofFormat,
  LegacyIndyProofFormatService,
  AnonCredsPredicateType,
  AnonCredsProof,
  AnonCredsRequestedAttribute,
  AnonCredsRequestedPredicate,
  LegacyIndyProofRequest,
  AnonCredsProofRequest,
  AnonCredsCredentialMetadataKey,
  AnonCredsModule,
  V1CredentialProtocol,
  LegacyIndyCredentialFormatService,
  AnonCredsCredentialFormatService,
  V1ProofProtocol
}
// Indy Vdr
export { IndyVdrAnonCredsRegistry, IndyVdrPoolConfig, IndyVdrIndyDidResolver, IndyVdrModule, IndyVdrSovDidResolver }
// Askar
export { AskarModule }
// Anoncreds RS
export { AnonCredsRsModule }
// Push Notifications
export { PushNotificationsFcmModule }
