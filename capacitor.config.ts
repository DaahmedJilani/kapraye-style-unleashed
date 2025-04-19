
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0f6add4e188e47089c30ceb4e8ad3458',
  appName: 'kapraye-style-unleashed',
  webDir: 'dist',
  server: {
    url: 'https://0f6add4e-188e-4708-9c30-ceb4e8ad3458.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: "#F9F1F0"
  }
};

export default config;
