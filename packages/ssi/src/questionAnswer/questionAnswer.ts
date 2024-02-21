import type { Agent, Query } from '@aries-framework/core'
import type { QuestionAnswerRecord, ValidResponse } from '@aries-framework/question-answer'

export type SendQuestionConfig = {
  question: string
  validResponses: ValidResponse[]
  detail?: string
}

/**
 * Sends a question to the connection with the given connection id.
 *
 * @param agent The agent instance .
 * @param connectionId The connection id.
 * @param config The question to send.
 */
export const sendQuestion = async (agent: Agent, connectionId: string, config: SendQuestionConfig) => {
  return agent.modules.questionAnswer.sendQuestion(connectionId, config)
}

/**
 * Sends an answer to the question with the given question record id.
 *
 * @param agent The agent instance.
 * @param questionRecordId The question record id.
 * @param response The response to send.
 */
export const sendAnswer = async (agent: Agent, questionRecordId: string, response: string) => {
  return agent.modules.questionAnswer.sendAnswer(questionRecordId, response)
}

/**
 * Retrieves all question answer records that match the given query.
 *
 * @param agent The agent instance.
 * @param query The query to use to find the question record.
 */
export const getAllQuestionAnswerRecords = async (agent: Agent, query: Query<QuestionAnswerRecord>) => {
  return agent.modules.questionAnswer.findAllByQuery(query)
}

/**
 * Retrieves the question answer record with the given id.
 *
 * @param agent The agent instance.
 * @param questionAnswerRecordId The question record id.
 */
export const getQuestionAnswerRecordById = async (agent: Agent, questionRecordId: string) => {
  return agent.modules.questionAnswer.findById(questionRecordId)
}
