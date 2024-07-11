import type { Agent, BasicMessageRecord, Query } from '@credo-ts/core'

/**
 * Sends a basic message to the connection with the given connection id.
 *
 * @param agent The agent instance .
 * @param connectionId The connection id.
 * @param message The message to send.
 */
export const sendBasicMessage = async (agent: Agent, connectionId: string, message: string) => {
  return agent.basicMessages.sendMessage(connectionId, message)
}

/**
 * Finds all basic messages that match the given query.
 *
 * @param agent - The agent instance.
 * @param query - The query to match basic messages.
 * @returns A promise that resolves to an array of basic message records that match the query.
 */
export const findAllBasicMessageByQuery = async (agent: Agent, query: Query<BasicMessageRecord>) => {
  return agent.basicMessages.findAllByQuery(query)
}
