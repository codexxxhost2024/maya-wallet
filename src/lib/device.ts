import { v4 as uuidv4 } from 'uuid';

interface DeviceInfo {
  agent_id: string;
  user_agent: string;
  platform: string;
  browser: string;
}

export function getDeviceInfo(): DeviceInfo {
  // Get or generate a unique device ID
  let agentId = localStorage.getItem('device_agent_id');
  if (!agentId) {
    agentId = uuidv4();
    localStorage.setItem('device_agent_id', agentId);
  }

  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const browserInfo = getBrowserInfo(ua);

  return {
    agent_id: agentId,
    user_agent: ua,
    platform,
    browser: browserInfo
  };
}

function getBrowserInfo(ua: string): string {
  const browsers = [
    { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
    { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
    { name: 'Safari', pattern: /Version\/(\d+).*Safari/ },
    { name: 'Edge', pattern: /Edg\/(\d+)/ }
  ];

  for (const browser of browsers) {
    const match = ua.match(browser.pattern);
    if (match) {
      return `${browser.name} ${match[1]}`;
    }
  }

  return 'Unknown';
}