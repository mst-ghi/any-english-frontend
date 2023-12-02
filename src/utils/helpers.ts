export const isProduction = (() => {
  return process.env.NODE_ENV === 'production';
})();

export const isDevelopment = (() => {
  return process.env.NODE_ENV === 'development';
})();

export const forceReload = (toUrl?: string) => {
  if (typeof window) {
    location.href = toUrl || location.href;
  }
};

export const cleanUrl = (url?: string) => {
  if (url?.substring(url.length - 1) === '/') {
    return url?.substring(0, url.length - 1);
  }
  return url || '';
};

export const groupBy = <T>(array: T[], key: string): Record<string, T[]> => {
  const result = {};
  for (const item of array) {
    const value = item[key];
    if (result[value] === undefined) {
      result[value] = [];
    }
    result[value].push(item);
  }
  return result;
};

export const lightnersGroup = (lightners: ILightner[]) => {
  let level4 = [];
  let level3 = [];
  let level2 = [];
  let level1 = [];

  for (let index = 0; index < lightners.length; index++) {
    const lightner = lightners[index];
    if (lightner.level === 4) {
      level4.push(lightner);
    } else if (lightner.level === 3) {
      level3.push(lightner);
    } else if (lightner.level === 2) {
      level2.push(lightner);
    } else if (lightner.level === 1) {
      level1.push(lightner);
    }
  }

  return [
    { level: 4, values: level4, count: level4.length, color: 'red.3' },
    { level: 3, values: level3, count: level3.length, color: 'orange.3' },
    { level: 2, values: level2, count: level2.length, color: 'blue.3' },
    { level: 1, values: level1, count: level1.length, color: 'green.3' },
  ];
};
