import type { AdeyaAgent } from '../agent'

import AgentProvider, { useAgent } from '@aries-framework/react-hooks'

const useAdeyaAgent: () => {
  loading: boolean
  agent: AdeyaAgent
} = useAgent

export { useAdeyaAgent, AgentProvider as AdeyaAgentProvider }
