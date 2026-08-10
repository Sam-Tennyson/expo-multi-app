import { ExpoConfig } from "expo/config";

import { blueConfig } from "./apps/blue/config";
import { redConfig } from "./apps/red/config";

const APP_VARIANT = process.env.APP_VARIANT ?? "red";

const apps = {
  red: redConfig,
  blue: blueConfig,
};

const app = apps[APP_VARIANT as keyof typeof apps];

if (!app) {
  throw new Error(`Invalid APP_VARIANT: ${APP_VARIANT}`);
}

const config: ExpoConfig = {
  name: app.name,
  slug: app.slug,
  scheme: app.scheme,

  version: app.version,

  ios: {
    bundleIdentifier: app.ios.bundleIdentifier,
    buildNumber: app.ios.buildNumber,
  },

  android: {
    package: app.android.package,
    versionCode: app.android.versionCode,
  },

  extra: {
    appVariant: app.id,
    ota: app.ota,
    theme: app.theme,
    eas: {
      projectId: app.projectId,
    },
  },
};

export default config;
