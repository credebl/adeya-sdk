import type { AdeyaAgent } from '../agent'
import type { FcmDeviceInfo } from '@aries-framework/push-notifications'

/**
 * Sets the device information for push notifications using the provided connection ID and device information.
 *
 * @param agent - The Adeya agent instance.
 * @param connectionId - The connection ID for the device.
 * @param deviceInfo - The device information for push notifications.
 * @returns void.
 */
export const setPushNotificationDeviceInfo = async (
  agent: AdeyaAgent,
  connectionId: string,
  deviceInfo: FcmDeviceInfo
) => {
  return agent.modules.pushNotificationsFcm.setDeviceInfo(connectionId, deviceInfo)
}
