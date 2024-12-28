export interface DeviceInfo {
  agent_id: string;
  user_agent: string;
  platform: string;
  browser: string;
}

export interface BrowserInfo {
  name: string;
  pattern: RegExp;
}