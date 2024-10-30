import axios from 'axios'
import { createHash } from 'crypto'

export type AdeyaDigiLockerModuleOptions = {
  client_id?: string | undefined
  client_secret?: string | undefined
  redirect_url?: string | undefined
  authCode?: string | undefined
  codeVerifier?: string | undefined
}

export const base64UrlEncodeWithoutPadding = (input: Buffer): string => {
  return input.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export const generateCodeChallenge = (codeVerifier: string): string => {
  const hash = createHash('sha256').update(codeVerifier).digest()
  return base64UrlEncodeWithoutPadding(hash)
}

export const initiateDigiLockerOAuth = async ({
  client_id = '',
  redirect_url = '',
  codeVerifier = ''
}: AdeyaDigiLockerModuleOptions) => {
  try {
    const codeChallenge = generateCodeChallenge(codeVerifier)
    const authUrl = `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_url}&state=adeya2024&code_challenge=${codeChallenge}&code_challenge_method=S256`
    return authUrl
  } catch (error) {
    return error instanceof Error ? error : new Error('An unknown error occurred')
  }
}

export const fetchDigiLockerToken = async ({
  authCode = '',
  client_id = '',
  client_secret = '',
  redirect_url = '',
  codeVerifier = ''
}: AdeyaDigiLockerModuleOptions) => {
  const tokenUrl = 'https://api.digitallocker.gov.in/public/oauth2/1/token'

  const params =
    `grant_type=authorization_code&` +
    `code=${encodeURIComponent(authCode)}&` +
    `client_id=${encodeURIComponent(client_id)}&` +
    `client_secret=${encodeURIComponent(client_secret)}&` +
    `redirect_uri=${encodeURIComponent(redirect_url)}&` +
    `code_verifier=${encodeURIComponent(codeVerifier)}`

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { message: `Error fetching DigiLocker token: ${errorMessage}` }
  }
}

export const fetchAadhaarData = async (accessToken: string): Promise<{ message: string }> => {
  const aadhaarUrl = 'https://api.digitallocker.gov.in/public/oauth2/3/xml/eaadhaar'

  try {
    const response = await axios.get(aadhaarUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { message: `Error fetching Aadhaar data: ${errorMessage}` }
  }
}

export const fetchIssuedDocuments = async (accessToken: string): Promise<{ message: string }> => {
  const issuedDocumentsUrl = 'https://api.digitallocker.gov.in/public/oauth2/2/files/issued'

  try {
    const response = await axios.get(issuedDocumentsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { message: `Error fetching issued documents: ${errorMessage}` }
  }
}

export const fetchDocumentData = async (uri: string, accessToken: string): Promise<{ message: string }> => {
  const documentUrl = `https://api.digitallocker.gov.in/public/oauth2/1/xml/${uri}`

  try {
    const response = await axios.get(documentUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { message: `Error fetching document data: ${errorMessage}` }
  }
}

export const fetchDocument = async (uri: string, accessToken: string): Promise<{ message: string }> => {
  const documentUrl = `https://api.digitallocker.gov.in/public/oauth2/1/file/${uri}`

  try {
    const response = await axios.get(documentUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { message: `Error fetching document data: ${errorMessage}` }
  }
}
