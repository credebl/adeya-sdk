import type { Agent } from '@aries-framework/core'
import type { AgentModulesInput } from '@aries-framework/core/build/agent/AgentModules'

import AgentProvider, { useAgent } from '@aries-framework/react-hooks'

const useAdeyaAgent: <AgentModules extends AgentModulesInput = AgentModulesInput>() => {
  loading: boolean
  agent: Agent<AgentModules>
} = useAgent

export { useAdeyaAgent, AgentProvider as AdeyaAgentProvider }
