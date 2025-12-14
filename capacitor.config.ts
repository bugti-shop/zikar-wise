import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'zikr.qalbify.com',
  appName: 'Qalbify',
  webDir: 'dist',
  server: {
     cleartext: true
  }
};

export default config;
