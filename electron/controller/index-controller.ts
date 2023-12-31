import type { WebAppType } from '../types/setting-page-info';

export const getWebApps = (): WebAppType[] => {
  return [
    {
      baseUrl: 'https://thehentaiworld.com',
      name: 'HWord',
      icon: 'https://thehentaiworld.com/favicon.ico',
    },
  ];
};
