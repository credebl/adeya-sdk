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
  AnonCredsProofRequest
} from '@aries-framework/anoncreds'
import { AnonCredsCredentialMetadataKey } from '@aries-framework/anoncreds/build/utils/metadata'
// Core
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
  ConnectionType
} from '@aries-framework/core'
import {
  GetCredentialsForRequestReturn,
  ProofFormatDataMessagePayload
} from '@aries-framework/core/build/modules/proofs/protocol/ProofProtocolOptions'
// Indy VDR
import { IndyVdrPoolConfig } from '@aries-framework/indy-vdr'

export * from './providers'
export * from './hooks'
export * from './wallet'
export * from './connections'
export * from './credentials'
export * from './proofs'
export * from './basicMessages'
export * from './pushNotifications'
export { initializeAgent, AdeyaAgent } from './agent'
// Core
export {
  LogLevel,
  ConsoleLogger,
  InitConfig,
  IndyVdrPoolConfig,
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
  ProofFormatDataMessagePayload
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
  AnonCredsCredentialMetadataKey
}
