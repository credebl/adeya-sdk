import type {
  CreateLegacyInvitationConfig,
  CreateOutOfBandInvitationConfig,
  ReceiveOutOfBandInvitationConfig
} from '@aries-framework/core'

import { useAdeyaAgent } from '../providers'

/**
 * Creates an invitation with RFC 0160: Connection Protocol and returns it together with out-of-band record and invitationUrl.
 *
 * @param domain domain of the agent
 * @param config configuration of how a connection invitation should be created
 * @returns out-of-band record and connection invitation together with invitationUrl
 */
export const createLegacyInvitation = async (domain: string, config?: CreateLegacyInvitationConfig) => {
  const { agent } = useAdeyaAgent()

  const record = await agent?.oob.createLegacyInvitation(config)

  const invitationUrl = record.invitation.toUrl({ domain })

  return {
    record,
    invitation: record.invitation,
    invitationUrl
  }
}

/**
 * Creates an out-of-band invitation for establishing a connection with another agent.
 *
 * @param domain The domain to use for the invitation URL.
 * @param config Optional configuration for the invitation.
 * @returns An object containing the invitation record, the invitation object, and the invitation URL.
 */
export const createInvitation = async (domain: string, config?: CreateOutOfBandInvitationConfig) => {
  const { agent } = useAdeyaAgent()

  const record = await agent?.oob.createInvitation(config)

  const invitationUrl = record.outOfBandInvitation.toUrl({ domain })

  return {
    record,
    invitation: record.outOfBandInvitation,
    invitationUrl
  }
}

/**
 * Parses an invitation from a URL using the Adeya agent.
 *
 * @param invitationUrl The URL of the invitation to parse.
 * @returns A Promise that resolves with the parsed invitation.
 */
export const parseInvitationFromUrl = async (invitationUrl: string) => {
  const { agent } = useAdeyaAgent()

  return agent.oob.parseInvitation(invitationUrl)
}

/**
 * Accepts a connection invitation from a URL.
 *
 * @param invitationUrl The URL of the connection invitation.
 * @param config Optional configuration for receiving the out-of-band invitation.
 * @returns A Promise that resolves to the connection record and out of band record.
 * @throws An error if the invitation cannot be parsed from the URL or if the connection does not have an ID.
 */
export const acceptInvitationFromUrl = async (invitationUrl: string, config?: ReceiveOutOfBandInvitationConfig) => {
  const { agent } = useAdeyaAgent()
  const invitation = await agent?.oob.parseInvitation(invitationUrl)

  if (!invitation) {
    throw new Error('Could not parse invitation from URL')
  }

  const record = await agent?.oob.receiveInvitation(invitation, config)
  const connectionRecord = record?.connectionRecord
  if (!connectionRecord?.id) {
    throw new Error('Connection does not have an ID')
  }

  return record
}

/**
 * Returns all connections from the agent.
 *
 * @returns A promise that resolves to an array of Connection objects.
 */
export const getAllConnections = async () => {
  const { agent } = useAdeyaAgent()

  return agent.connections.getAll()
}

/**
 * Retrieves a connection record by connectionId.
 *
 * @param connectionId The ID of the connection to retrieve.
 * @returns A Promise that resolves to the connection object.
 */
export const getConnectionById = async (connectionId: string) => {
  const { agent } = useAdeyaAgent()

  return agent.connections.getById(connectionId)
}

/**
 * Finds a connection record by its ID.
 *
 * @param connectionId The ID of the connection to find.
 * @returns A Promise that resolves with the connection object, or null if not found.
 */
export const findConnectionById = async (connectionId: string) => {
  const { agent } = useAdeyaAgent()

  return await agent.connections.findById(connectionId)
}

/**
 * Finds an out-of-band record by its connection ID.
 *
 * @param connectionId The ID of the connection to find.
 * @returns A Promise that resolves to the out-of-band record with the given ID.
 */
export const findOutOfBandRecordById = async (connectionId: string) => {
  const { agent } = useAdeyaAgent()

  return await agent.oob.findById(connectionId)
}

/**
 * Deletes a connection by its ID.
 *
 * @param connectionId The ID of the connection to be deleted.
 * @returns A boolean indicating whether the connection was successfully deleted or not.
 */
export const deleteConnectionById = async (connectionId: string) => {
  const { agent } = useAdeyaAgent()

  await agent.connections.deleteById(connectionId)
  return true
}
