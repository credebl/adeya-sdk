import type { InitConfig } from '@credo-ts/core'
import type {
  GenericRecord,
  SaveGenericRecordOption
} from '@credo-ts/core/build/modules/generic-records/repository/GenericRecord'

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
  V1ProofProtocol,
  AnonCredsCredentialInfo
} from '@credo-ts/anoncreds'
import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds/build/utils/metadata'
// Core
import { AskarModule } from '@credo-ts/askar'
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
  Agent,
  BasicMessageRepository,
  CredoError,
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
  ConnectionEventTypes,
  CredentialEventTypes,
  ProofEventTypes,
  Query,
  utils,
  TypedArrayEncoder,
  DifPresentationExchangeProofFormatService,
  JsonTransformer,
  ClaimFormat,
  CacheModule,
  SingleContextStorageLruCache,
  DidRepository,
  KeyType,
  DidRecord,
  W3cJsonLdVerifiableCredential,
  DifPexCredentialsForRequest
} from '@credo-ts/core'
import {
  GetCredentialsForRequestReturn,
  ProofFormatDataMessagePayload
} from '@credo-ts/core/build/modules/proofs/protocol/ProofProtocolOptions'
// Indy VDR
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
  IndyVdrPoolConfig,
  IndyVdrSovDidResolver
} from '@credo-ts/indy-vdr'
import { PushNotificationsFcmModule } from '@credo-ts/push-notifications'
// Q&A
import {
  QuestionAnswerRecord,
  QuestionAnswerEventTypes,
  QuestionAnswerStateChangedEvent,
  QuestionAnswerState
} from '@credo-ts/question-answer'

export * from './agent'
export * from './providers'
export * from './hooks'
export * from './wallet'
export * from './connections'
export * from './credentials'
export * from './proofs'
export * from './basicMessages'
export * from './pushNotifications'
export * from './genericRecords'
export * from './questionAnswer'
export * from './w3cCredentials'
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
  Agent,
  BasicMessageRepository,
  CredoError,
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
  ConnectionEventTypes,
  CredentialEventTypes,
  ProofEventTypes,
  GenericRecord,
  SaveGenericRecordOption,
  Query,
  utils,
  TypedArrayEncoder,
  DifPresentationExchangeProofFormatService,
  JsonTransformer,
  ClaimFormat,
  CacheModule,
  SingleContextStorageLruCache,
  DidRepository,
  KeyType,
  DidRecord,
  W3cJsonLdVerifiableCredential,
  DifPexCredentialsForRequest
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
  V1ProofProtocol,
  AnonCredsCredentialInfo
}
// Indy Vdr
export { IndyVdrAnonCredsRegistry, IndyVdrPoolConfig, IndyVdrIndyDidResolver, IndyVdrModule, IndyVdrSovDidResolver }
// Askar
export { AskarModule }
// Push Notifications
export { PushNotificationsFcmModule }
// Q&A
export { QuestionAnswerRecord, QuestionAnswerEventTypes, QuestionAnswerStateChangedEvent, QuestionAnswerState }
