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
import { LogLevel, ConsoleLogger } from '@aries-framework/core'
// Indy VDR
import { IndyVdrPoolConfig } from '@aries-framework/indy-vdr'

export { initializeAgent, AdeyaAgent } from './agent'
export { LogLevel, ConsoleLogger, InitConfig, IndyVdrPoolConfig }
export * from './providers'
export * from './hooks'
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
