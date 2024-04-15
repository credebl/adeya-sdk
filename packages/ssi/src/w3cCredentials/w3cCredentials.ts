import type { Agent, StoreCredentialOptions, W3cJsonLdSignCredentialOptions } from '@credo-ts/core'

// W3C Credential

/**
 * Signed a W3C credential.
 *
 * @param agent The agent instance to use for retrieving the credential record.
 * @param W3cJsonLdSignCredentialOptions The format of the credential to be signed.
 * @returns A Promise that resolves to signed w3c credential .
 */
export const signCredential = async (agent: Agent, options: W3cJsonLdSignCredentialOptions) => {
  return await agent.w3cCredentials.signCredential(options)
}

/**
 * Store a W3C credential.
 *
 * @param agent The agent instance to use for retrieving the credential record.
 * @param StoreCredentialOptions The format of the credential to be stored.
 * @returns A Promise that resolves to stored w3c credential.
 */
export const storeCredential = async (agent: Agent, options: StoreCredentialOptions) => {
  return await agent.w3cCredentials.storeCredential(options)
}
