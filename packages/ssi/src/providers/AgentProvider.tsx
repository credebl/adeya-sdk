import type { Agent } from '@aries-framework/core'

import AgentProvider, { useAgent } from '@aries-framework/react-hooks'

const useAdeyaAgent: () => {
  loading: boolean
  agent: Agent
} = useAgent

export { useAdeyaAgent, AgentProvider as AdeyaAgentProvider }
