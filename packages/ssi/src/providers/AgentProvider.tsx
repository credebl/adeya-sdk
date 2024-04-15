import type { Agent } from '@credo-ts/core'
import type { AgentModulesInput } from '@credo-ts/core/build/agent/AgentModules'

import AgentProvider, { useAgent } from '@credo-ts/react-hooks'

const useAdeyaAgent: <AgentModules extends AgentModulesInput = AgentModulesInput>() => {
  loading: boolean
  agent: Agent<AgentModules>
} = useAgent

export { useAdeyaAgent, AgentProvider as AdeyaAgentProvider }
