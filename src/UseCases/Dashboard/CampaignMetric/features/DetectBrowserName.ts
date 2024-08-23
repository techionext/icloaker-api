export function handleDetectBrowserName(userAgent: string = '') {
  const browsers = {
    'Google Chrome': /Chrome\/[0-9]+/,
    'Mozilla Firefox': /Firefox\/[0-9]+/,
    Safari: /Version\/[0-9]+\.[0-9]+.*Safari/,
    'Microsoft Edge': /Edg\/[0-9]+/,
    'Internet Explorer': /(MSIE [0-9]+|Trident\/[0-9]+)/,
    Opera: /(Opera\/[0-9]+|OPR\/[0-9]+)/,
    Brave: /Brave\/[0-9]+/,
    Vivaldi: /Vivaldi\/[0-9]+/,
  };

  for (const [browser, pattern] of Object.entries(browsers)) {
    if (pattern.test(userAgent)) {
      return browser;
    }
  }

  return 'Unknown Browser';
}
