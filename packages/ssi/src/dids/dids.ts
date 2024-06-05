import type { Agent, DidCreateOptions, DidResolutionOptions, ImportDidOptions } from '@credo-ts/core'

/**
 * Create a new DID.
 *
 * @param agent The agent instance.
 * @returns A promise that resolves to the created DID.
 */
export const createDid = async <T extends DidCreateOptions = DidCreateOptions>(agent: Agent, options: T) => {
  return agent.dids.create<T>(options)
}

/**
 * Resolve a DID.
 *
 * @param agent The agent instance to use for resolving the DID.
 * @param did The DID to resolve.
 * @param options The options for resolving the DID.
 * @returns A promise that resolves to the resolved DID.
 */
export const resolveDid = async (agent: Agent, did: string, options?: DidResolutionOptions) => {
  return agent.dids.resolve(did, options)
}

/**
 * Resolve a DID Document.
 *
 * @param agent The agent instance to use for resolving the DID.
 * @param did The DID to resolve.
 * @returns A promise that resolves to the resolved DID Document.
 */
export const resolveDidDocument = async (agent: Agent, didUrl: string) => {
  return agent.dids.resolveDidDocument(didUrl)
}

/**
 * Retrieve all DIDs.
 *
 * @param agent The agent instance to use for retrieving the DIDs.
 * @returns A promise that resolves to an array of DIDs.
 */
export const getCreatedDids = async (
  agent: Agent,
  options?: { method?: string | undefined; did?: string | undefined }
) => {
  return agent.dids.getCreatedDids(options)
}

/**
 * import DID.
 *
 * @param agent The agent instance.
 * @returns void.
 */
export const importDid = async (agent: Agent, options: ImportDidOptions) => {
  return agent.dids.import(options)
}

/**
 * Get supported DID registrar methods.
 *
 * @param agent The agent instance.
 * @returns supported did registrar methods.
 */
export const getSupportedDidRegistrarMethods = async (agent: Agent) => {
  return agent.dids.supportedRegistrarMethods
}

/**
 * Get supported DID resolver methods.
 *
 * @param agent The agent instance.
 * @returns supported did resolver methods.
 */
export const getSupportedDidResolverMethods = async (agent: Agent) => {
  return agent.dids.supportedResolverMethods
}
