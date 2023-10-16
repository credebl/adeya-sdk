# @adeya/ssi

[![npm](https://img.shields.io/npm/v/@adeya/ssi.svg)](https://www.npmjs.com/package/@adeya/ssi)
[![npm](https://img.shields.io/npm/v/@adeya/ssi/alpha.svg)](https://www.npmjs.com/package/@adeya/ssi)

- [Installing](#installing)
- [Usage](#usage)
- [API](#api)
  - [Agent](#agent)
  - [Wallet](#wallet)
  - [Connections](#connections)
  - [Credentials](#credentials)
  - [Proofs](#proofs)
  - [BasicMessages](#basicmessages)
  - [PushNotifications](#pushnotifications)
  - [Hooks](#hooks)

## Installing

```sh
npm install @adeya/ssi

# or

yarn add @adeya/ssi

# or

pnpm add @adeya/ssi
```

## Peer Dependencies

- We also need to add the peer dependencies of this package to our App.

```
"dependencies": {
  ...
  "@hyperledger/anoncreds-react-native": "^0.1.0",
  "@hyperledger/aries-askar-react-native": "^0.1.1",
  "@hyperledger/indy-vdr-react-native": "^0.1.0",
}
```

## Usage

```ts
import { useAdeyaAgent } from '@adeya/ssi'

const { agent } = useAdeyaAgent()
```

## API

### Agent

- initializeAgent - Initialize the agent with the given `Config` and `Agent Modules`

```ts
import { initializeAgent } from '@adeya/ssi'

const config: InitConfig = {
  label: 'ADEYA Wallet',
  walletConfig: {
    id: 'adeya-wallet',
    key: 'adeya-wallet-key'
  },
  logger: new ConsoleLogger(LogLevel.debug),
  autoUpdateStorageOnStartup: true
}

const agent = await initializeAgent({
  agentConfig: config,
  modules: getAgentModules(mediatorUrl, indyLedgers)
})
```

- getAgentModules - Get the default agent modules.

```ts
import { getAgentModules } from '@adeya/ssi'

const modules = getAgentModules(mediatorUrl, indyLedgers)
```

- AdeyaAgent - The agent instance type.

```ts
import { AdeyaAgent } from '@adeya/ssi'
```

### Wallet

- isWalletPinCorrect - Check if the wallet pin is correct.

```ts
import { isWalletPinCorrect } from '@adeya/ssi'

const isCorrect = await isWalletPinCorrect(walletConfig)
```

- exportWallet - Export the wallet.

```ts
import { exportWallet } from '@adeya/ssi'

await exportWallet(agent, exportConfig)
```

- importWalletWithAgent - Import the wallet and start the agent.

```ts
import { importWalletWithAgent } from '@adeya/ssi'

const agent = await importWalletWithAgent({
  importConfig,
  agentConfig,
  modules
})
```

### Connections

- createLegacyInvitation - Create a legacy invitation.

```ts
import { createLegacyInvitation } from '@adeya/ssi'

const connection = await createLegacyInvitation(agent, domain, config)
```

- createLegacyConnectionlessInvitation - Create a legacy connectionless invitation.

```ts
import { createLegacyConnectionlessInvitation } from '@adeya/ssi'

const connection = await createLegacyConnectionlessInvitation(agent, config)
```

- createInvitation - Create an invitation.

```ts
import { createInvitation } from '@adeya/ssi'

const connection = await createInvitation(agent, domain, config)
```

- acceptInvitation - Accept an invitation.

```ts
import { acceptInvitation } from '@adeya/ssi'

const connection = await acceptInvitation(agent, invitation, config)
```

- parseInvitationFromUrl - Parse an invitation from a url.

```ts
import { parseInvitationFromUrl } from '@adeya/ssi'

const invitation = await parseInvitationFromUrl(agent, invitationUrl)
```

- acceptInvitationFromUrl - Accept an invitation from a url.

```ts
import { acceptInvitationFromUrl } from '@adeya/ssi'

const connection = await acceptInvitationFromUrl(agent, invitationUrl, config)
```

- getAllConnections - Get all connections.

```ts
import { getAllConnections } from '@adeya/ssi'

const connections = await getAllConnections(agent)
```

- getConnectionById - Get a connection by id.

```ts
import { getConnectionById } from '@adeya/ssi'

const connection = await getConnectionById(agent, connectionId)
```

- findConnectionById - Find a connection by id.

```ts
import { findConnectionById } from '@adeya/ssi'

const connection = await findConnectionById(agent, connectionId)
```

- findOutOfBandRecordById - Find an out of band record by id.

```ts
import { findOutOfBandRecordById } from '@adeya/ssi'

const record = await findOutOfBandRecordById(agent, recordId)
```

- deleteConnectionById - Delete a connection by id.

```ts
import { deleteConnectionById } from '@adeya/ssi'

await deleteConnectionById(agent, connectionId)
```

### Credentials

- getAllCredentialExchangeRecords - Get all credential exchange records.

```ts
import { getAllCredentialExchangeRecords } from '@adeya/ssi'

const records = await getAllCredentialExchangeRecords(agent)
```

- getFormattedCredentialData - Retrieves the formatted data for a given credential record ID.

```ts
import { getFormattedCredentialData } from '@adeya/ssi'

const formattedData = await getFormattedCredentialData(agent, credentialRecordId)
```

- acceptCredentialOffer - Accept a credential offer.

```ts
import { acceptCredentialOffer } from '@adeya/ssi'

const credential = await acceptCredentialOffer(agent, options)
```

- updateCredentialExchangeRecord - Update a credential exchange record.

```ts
import { updateCredentialExchangeRecord } from '@adeya/ssi'

await updateCredentialExchangeRecord(agent, credentialRecord)
```

- declineCredentialOffer - Decline a credential offer.

```ts
import { declineCredentialOffer } from '@adeya/ssi'

const record = await declineCredentialOffer(agent, credentialRecordId)
```

- deleteCredentialExchangeRecordById - Delete a credential exchange record by id.

```ts
import { deleteCredentialExchangeRecordById } from '@adeya/ssi'

await deleteCredentialExchangeRecordById(agent, credentialRecordId, options)
```

- sendCredentialProblemReport - Send a credential problem report.

```ts
import { sendCredentialProblemReport } from '@adeya/ssi'

const record = await sendCredentialProblemReport(agent, options)
```

- getW3cCredentialRecordById - Get a W3C credential record by id.

```ts
import { getW3cCredentialRecordById } from '@adeya/ssi'

const record = await getW3cCredentialRecordById(agent, credentialRecordId)
```

- getAllW3cCredentialRecords - Get all W3C credential records.

```ts
import { getAllW3cCredentialRecords } from '@adeya/ssi'

const records = await getAllW3cCredentialRecords(agent)
```

### Proofs

- getProofFormatData - Get proof format data.

```ts
import { getProofFormatData } from '@adeya/ssi'

const data = await getProofFormatData(agent, proofRecordId)
```

- getCredentialsForProofRequest - Get credentials for a proof request.

```ts
import { getCredentialsForProofRequest } from '@adeya/ssi'

const credentials = await getCredentialsForProofRequest(agent, options)
```

- selectCredentialsForProofRequest - Select credentials for a proof request.

```ts
import { selectCredentialsForProofRequest } from '@adeya/ssi'

const credentials = await selectCredentialsForProofRequest(agent, options)
```

- getProofRequestAgentMessage - Get a proof request agent message.

```ts
import { getProofRequestAgentMessage } from '@adeya/ssi'

const message = await getProofRequestAgentMessage(agent, proofRecordId)
```

- createProofRequest - Create a proof request.

```ts
import { createProofRequest } from '@adeya/ssi'

const proofRequest = await createProofRequest(agent, options)
```

- requestProof - Request a proof.

```ts
import { requestProof } from '@adeya/ssi'

const proof = await requestProof(agent, options)
```

- updateProofRecord - Update a proof record.

```ts
import { updateProofRecord } from '@adeya/ssi'

await updateProofRecord(agent, proofRecord)
```

- acceptProofRequest - Accept a proof request.

```ts
import { acceptProofRequest } from '@adeya/ssi'

const proof = await acceptProofRequest(agent, options)
```

- declineProofRequest - Decline a proof request.

```ts
import { declineProofRequest } from '@adeya/ssi'

const proof = await declineProofRequest(agent, options)
```

- sendProofProblemReport - Send a proof problem report.

```ts
import { sendProofProblemReport } from '@adeya/ssi'

const proof = await sendProofProblemReport(agent, options)
```

### BasicMessages

- sendBasicMessage - Send a basic message.

```ts
import { sendBasicMessage } from '@adeya/ssi'

const record = await sendBasicMessage(agent, options)
```

### PushNotifications

- setPushNotificationDeviceInfo - Set the push notification device info.

```ts
import { setPushNotificationDeviceInfo } from '@adeya/ssi'

await setPushNotificationDeviceInfo(agent, options)
```

### Hooks

- useAdeyaAgent - React hook to get the agent instance.

```ts
import { useAdeyaAgent } from '@adeya/ssi'

const { agent } = useAdeyaAgent()
```
