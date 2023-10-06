import type {
  V1ProofProtocol,
  LegacyIndyProofFormatService,
  AnonCredsProofFormatService
} from '@aries-framework/anoncreds'
import type {
  AcceptProofRequestOptions,
  CreateProofRequestOptions,
  DeclineProofRequestOptions,
  GetCredentialsForProofRequestOptions,
  ProofExchangeRecord,
  RequestProofOptions,
  SelectCredentialsForProofRequestOptions,
  SendProofProblemReportOptions,
  V2ProofProtocol
} from '@aries-framework/core'

import { useAdeyaAgent } from 'src/providers'

export type ProofFormats = (
  | V1ProofProtocol
  | V2ProofProtocol<(LegacyIndyProofFormatService | AnonCredsProofFormatService)[]>
)[]

/**
 * Retrieves the formatted data for a proof record with the given ID.
 *
 * @param proofRecordId The ID of the proof record to retrieve format data for.
 * @returns A Promise that resolves with the format data for the proof record.
 */
export const getProofFormatData = async (proofRecordId: string) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.getFormatData(proofRecordId)
}

/**
 * Retrieves the available credentials for a proof request.
 *
 * @param options The options for retrieving the credentials.
 * @returns A Promise that resolves with the credentials for the proof request.
 */
export const getCredentialsForProofRequest = async (options: GetCredentialsForProofRequestOptions<ProofFormats>) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.getCredentialsForRequest(options)
}

/**
 * Select the credentials to be used for a proof request.
 *
 * @param options - The options for selecting the credentials.
 * @returns A promise that resolves to the selected credentials.
 */
export const selectCredentialsForProofRequest = async (
  options: SelectCredentialsForProofRequestOptions<ProofFormats>
) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.selectCredentialsForRequest(options)
}

/**
 * Retrieves the proof request agent message associated with the given proof record ID.
 *
 * @param proofRecordId The ID of the proof record to retrieve the request message for.
 * @returns A Promise that resolves to the proof request message.
 */
export const getProofRequestAgentMessage = async (proofRecordId: string) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.findRequestMessage(proofRecordId)
}

/**
 * Creates a proof request.
 *
 * @param options - The options for creating the proof request.
 * @returns A promise that resolves to the created proof request.
 */
export const createProofRequest = async (options: CreateProofRequestOptions<ProofFormats>) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.createRequest(options)
}

/**
 * Requests a proof.
 *
 * @param options - The options for requesting the proof.
 * @returns A Promise that resolves with the ProofExchangeRecord
 */
export const requestProof = async (options: RequestProofOptions<ProofFormats>) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.requestProof(options)
}

/**
 * Update a proof exchange record.
 *
 * @param proofRecord The proof exchange record to update.
 * @returns void.
 */
export const updateProofRecord = (proofRecord: ProofExchangeRecord) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.update(proofRecord)
}

/**
 * Accepts a proof request .
 *
 * @param options - The options for accepting the proof request.
 * @returns A Promise that resolves with the result of accepting the proof request.
 */
export const acceptProofRequest = async (options: AcceptProofRequestOptions<ProofFormats>) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.acceptRequest(options)
}

/**
 * Decline a proof request.
 *
 * @param options - The options for declining the proof request.
 * @returns A Promise that resolves ProofExchangeRecord of declining the proof request.
 */
export const declineProofRequest = async (options: DeclineProofRequestOptions) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.declineRequest(options)
}

/**
 * Sends a problem report for a proof to Agent.
 *
 * @param options - The options for sending the problem report.
 * @returns A Promise that resolves ProofExchangeRecord when the problem report has been sent.
 */
export const sendProofProblemReport = async (options: SendProofProblemReportOptions) => {
  const { agent } = useAdeyaAgent()

  return agent.proofs.sendProblemReport(options)
}
