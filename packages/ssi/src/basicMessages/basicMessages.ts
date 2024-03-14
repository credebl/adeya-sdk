import type { Agent } from '@credo-ts/core'

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
