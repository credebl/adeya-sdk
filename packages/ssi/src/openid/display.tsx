import type { OpenId4VcCredentialMetadata } from './metadata'
import type {
  CredentialDisplay,
  CredentialForDisplayId,
  CredentialIssuerDisplay,
  JffW3cCredentialJson,
  W3cCredentialDisplay,
  W3cCredentialJson
} from './openIdHelpers'
import type { W3cCredentialRecord } from '@credo-ts/core'

import { Hasher, SdJwtVcRecord, ClaimFormat, JsonTransformer } from '@credo-ts/core'
import { decodeSdJwtSync, getClaimsSync } from '@sd-jwt/decode'

import { getOpenId4VcCredentialMetadata } from './metadata'
import { getHostOpenIdNameFromUrl, sanitizeString } from './openIdHelpers'

export function findDisplay<Display extends { locale?: string }>(display?: Display[]): Display | undefined {
  if (!display) return undefined

  let item = display.find((d) => d.locale?.startsWith('en-'))
  if (!item) item = display.find((d) => !d.locale)
  if (!item) item = display[0]

  return item
}

export function getIssuerDisplay(
  metadata: OpenId4VcCredentialMetadata | null | undefined
): Partial<CredentialIssuerDisplay> {
  const issuerDisplay: Partial<CredentialIssuerDisplay> = {}
  // Try to extract from openid metadata first
  const openidIssuerDisplay = findDisplay(metadata?.issuer.display)
  issuerDisplay.name = openidIssuerDisplay?.name
  issuerDisplay.logo = openidIssuerDisplay?.logo
    ? {
        url: openidIssuerDisplay.logo?.url,
        altText: openidIssuerDisplay.logo?.alt_text
      }
    : undefined

  // If the credentialDisplay contains a logo, and the issuerDisplay does not, use the logo from the credentialDisplay
  const openidCredentialDisplay = findDisplay(metadata?.credential.display)
  if (openidCredentialDisplay && !issuerDisplay.logo && openidCredentialDisplay.logo) {
    issuerDisplay.logo = {
      url: openidCredentialDisplay.logo?.url,
      altText: openidCredentialDisplay.logo?.alt_text
    }
  }

  return issuerDisplay
}

export function processIssuerDisplay(
  metadata: OpenId4VcCredentialMetadata | null | undefined,
  issuerDisplay: Partial<CredentialIssuerDisplay>
): CredentialIssuerDisplay {
  // Last fallback: use issuer id from openid4vc
  if (!issuerDisplay.name && metadata?.issuer.id) {
    issuerDisplay.name = getHostOpenIdNameFromUrl(metadata.issuer.id)
  }

  return {
    ...issuerDisplay,
    name: issuerDisplay.name ?? 'Unknown'
  }
}

export function getW3cIssuerDisplay(
  credential: W3cCredentialJson,
  openId4VcMetadata?: OpenId4VcCredentialMetadata | null
): CredentialIssuerDisplay {
  const issuerDisplay: Partial<CredentialIssuerDisplay> = getIssuerDisplay(openId4VcMetadata)

  // If openid metadata is not available, try to extract display metadata from the credential based on JFF metadata
  const jffCredential = credential as JffW3cCredentialJson
  const issuerJson = typeof jffCredential.issuer === 'string' ? undefined : jffCredential.issuer

  // Issuer Display from JFF
  if (!issuerDisplay.logo || !issuerDisplay.logo.url) {
    issuerDisplay.logo = issuerJson?.logoUrl
      ? { url: issuerJson?.logoUrl }
      : issuerJson?.image
      ? { url: typeof issuerJson.image === 'string' ? issuerJson.image : issuerJson.image.id }
      : undefined
  }

  // Issuer name from JFF
  if (!issuerDisplay.name) {
    issuerDisplay.name = issuerJson?.name
  }

  return processIssuerDisplay(openId4VcMetadata, issuerDisplay)
}

export function getSdJwtIssuerDisplay(openId4VcMetadata?: OpenId4VcCredentialMetadata | null): CredentialIssuerDisplay {
  const issuerDisplay: Partial<CredentialIssuerDisplay> = getIssuerDisplay(openId4VcMetadata)

  return processIssuerDisplay(openId4VcMetadata, issuerDisplay)
}

export function getCredentialDisplay(
  credentialPayload: Record<string, unknown>,
  openId4VcMetadata?: OpenId4VcCredentialMetadata | null
): Partial<CredentialDisplay> {
  const credentialDisplay: Partial<CredentialDisplay> = {}

  if (openId4VcMetadata) {
    const openidCredentialDisplay = findDisplay(openId4VcMetadata.credential.display)
    credentialDisplay.name = openidCredentialDisplay?.name
    credentialDisplay.description = openidCredentialDisplay?.description
    credentialDisplay.textColor = openidCredentialDisplay?.text_color
    credentialDisplay.backgroundColor = openidCredentialDisplay?.background_color
    credentialDisplay.backgroundImage = openidCredentialDisplay?.background_image
      ? {
          url: openidCredentialDisplay.background_image.url,
          altText: openidCredentialDisplay.background_image.alt_text
        }
      : undefined
  }

  return credentialDisplay
}

export function getW3cCredentialDisplay(
  credential: W3cCredentialJson,
  openId4VcMetadata?: OpenId4VcCredentialMetadata | null
) {
  const credentialDisplay: Partial<CredentialDisplay> = getCredentialDisplay(credential, openId4VcMetadata)

  // If openid metadata is not available, try to extract display metadata from the credential based on JFF metadata
  const jffCredential = credential as JffW3cCredentialJson

  if (!credentialDisplay.name) {
    credentialDisplay.name = jffCredential.name
  }

  // If there's no name for the credential, we extract it from the last type
  // and sanitize it. This is not optimal. But provides at least something.
  if (!credentialDisplay.name && jffCredential.type.length > 1) {
    const lastType = jffCredential.type[jffCredential.type.length - 1]
    credentialDisplay.name = lastType && !lastType.startsWith('http') ? sanitizeString(lastType) : undefined
  }

  // Use background color from the JFF credential if not provided by the OID4VCI metadata
  if (!credentialDisplay.backgroundColor && jffCredential.credentialBranding?.backgroundColor) {
    credentialDisplay.backgroundColor = jffCredential.credentialBranding.backgroundColor
  }

  return {
    ...credentialDisplay,
    // Last fallback, if there's really no name for the credential, we use a generic name
    name: credentialDisplay.name ?? 'Credential'
  }
}

export function getSdJwtCredentialDisplay(
  credentialPayload: Record<string, unknown>,
  openId4VcMetadata?: OpenId4VcCredentialMetadata | null
) {
  const credentialDisplay: Partial<CredentialDisplay> = getCredentialDisplay(credentialPayload, openId4VcMetadata)

  if (!credentialDisplay.name && typeof credentialPayload.vct === 'string') {
    credentialDisplay.name = sanitizeString(credentialPayload.vct)
  }

  return {
    ...credentialDisplay,
    name: credentialDisplay.name ?? 'Credential'
  }
}

interface CredentialMetadata {
  type: string
  issuer: string
  holder: string | Record<string, unknown>
  validUntil?: Date
  validFrom?: Date
  issuedAt?: Date
}

export function filterAndMapSdJwtKeys(sdJwtVcPayload: Record<string, unknown>) {
  type SdJwtVcPayload = {
    iss: string
    cnf: Record<string, unknown>
    vct: string
    iat?: number
    nbf?: number
    exp?: number
    [key: string]: unknown
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _sd_alg, _sd_hash, iss, vct, cnf, iat, exp, nbf, ...visibleProperties } = sdJwtVcPayload as SdJwtVcPayload

  const credentialMetadata: CredentialMetadata = {
    type: vct,
    issuer: iss,
    holder: cnf
  }

  if (iat) {
    credentialMetadata.issuedAt = new Date(iat * 1000)
  }
  if (exp) {
    credentialMetadata.validUntil = new Date(exp * 1000)
  }
  if (nbf) {
    credentialMetadata.validFrom = new Date(nbf * 1000)
  }

  return {
    visibleProperties,
    metadata: credentialMetadata
  }
}

export function getCredentialForDisplaySdJwt(
  credentialRecord: SdJwtVcRecord,
  metadata: OpenId4VcCredentialMetadata | null
): W3cCredentialDisplay {
  const { disclosures, jwt } = decodeSdJwtSync(credentialRecord.compactSdJwtVc, (data, alg) => Hasher.hash(data, alg))
  const decodedPayload: Record<string, unknown> = getClaimsSync(jwt.payload, disclosures, (data, alg) =>
    Hasher.hash(data, alg)
  )

  const issuerDisplay = getSdJwtIssuerDisplay(metadata)
  const credentialDisplay = getSdJwtCredentialDisplay(decodedPayload, metadata)

  return {
    id: `sd-jwt-vc-${credentialRecord.id}` as CredentialForDisplayId,
    createdAt: credentialRecord.createdAt,
    display: {
      ...credentialDisplay,
      issuer: issuerDisplay
    },
    attributes: filterAndMapSdJwtKeys(decodedPayload).visibleProperties
  }
}

export function getCredentialForDisplay(credentialRecord: W3cCredentialRecord | SdJwtVcRecord): W3cCredentialDisplay {
  const openId4VcMetadata = getOpenId4VcCredentialMetadata(credentialRecord)

  if (credentialRecord instanceof SdJwtVcRecord) {
    return getCredentialForDisplaySdJwt(credentialRecord, openId4VcMetadata)
  }

  const credential = JsonTransformer.toJSON(
    credentialRecord.credential.claimFormat === ClaimFormat.JwtVc
      ? credentialRecord.credential.credential
      : credentialRecord.credential
  ) as W3cCredentialJson

  const issuerDisplay = getW3cIssuerDisplay(credential, openId4VcMetadata)
  const credentialDisplay = getW3cCredentialDisplay(credential, openId4VcMetadata)

  // to be implimented later support credential with multiple subjects
  const credentialAttributes = Array.isArray(credential.credentialSubject)
    ? credential.credentialSubject[0] ?? {}
    : credential.credentialSubject

  return {
    id: `w3c-credential-${credentialRecord.id}` as CredentialForDisplayId,
    createdAt: credentialRecord.createdAt,
    display: {
      ...credentialDisplay,
      issuer: issuerDisplay
    },
    credential,
    attributes: credentialAttributes
  }
}
