import { DeviceInfo } from './types';
import { detectBrowser } from './browserDetection';
import { getStoredDeviceId } from './storage';

export function getDeviceInfo(): DeviceInfo {
  return {
    agent_id: getStoredDeviceId(),
    user_agent: navigator.userAgent,
    platform: navigator.platform,
    browser: detectBrowser(navigator.userAgent)
  };
}

export type { DeviceInfo } from './types';