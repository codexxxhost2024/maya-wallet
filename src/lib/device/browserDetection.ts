import { BrowserInfo } from './types';

const browsers: BrowserInfo[] = [
  { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
  { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
  { name: 'Safari', pattern: /Version\/(\d+).*Safari/ },
  { name: 'Edge', pattern: /Edg\/(\d+)/ }
];

export function detectBrowser(userAgent: string): string {
  for (const browser of browsers) {
    const match = userAgent.match(browser.pattern);
    if (match) {
      return `${browser.name} ${match[1]}`;
    }
  }
  return 'Unknown';
}