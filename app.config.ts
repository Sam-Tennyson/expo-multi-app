import { ExpoConfig } from "expo/config";
import { existsSync } from "node:fs";

import { blueConfig } from "./apps/blue/config";
import { redConfig } from "./apps/red/config";

const APP_VARIANT = process.env.APP_VARIANT ?? "red";

const apps = {
  red: redConfig,
  blue: blueConfig,

  // more apps here
};

const app = apps[APP_VARIANT as keyof typeof apps];

if (!app) {
  throw new Error(`Invalid APP_VARIANT: ${APP_VARIANT}`);
}

const googleServicesFile = app.notifications.googleServicesFile;
const hasGoogleServicesFile = existsSync(googleServicesFile);
const configuredEnvironment = process.env.EXPO_PUBLIC_APP_ENV;
const isDevelopment = configuredEnvironment
  ? configuredEnvironment !== "production"
  : app.isDevelopment;
const appEnvironment = isDevelopment ? "development" : "production";
const version = isDevelopment ? app.versionDev : app.versionProd;
const iosVersion = isDevelopment ? app.versionDev : app.versionProdIos;
const otaUpdateNumber = isDevelopment
  ? app.otaUpdateNumberDev
  : app.otaUpdateNumberProd;

const config: ExpoConfig = {
  name: app.name,
  slug: app.slug,
  scheme: app.scheme,

  version,

  ios: {
    version: iosVersion,
    bundleIdentifier: app.ios.bundleIdentifier,
    buildNumber: app.ios.buildNumber,
  },

  android: {
    package: app.android.package,
    versionCode: app.android.versionCode,
    ...(hasGoogleServicesFile ? { googleServicesFile } : {}),
  },

  plugins: [
    "expo-router",
    "expo-dev-client",
    [
      "expo-notifications",
      {
        color: app.theme.primaryColor,
        defaultChannel: app.notifications.androidChannelId,
      },
    ],
  ],

  runtimeVersion: {
    policy: "appVersion",
  },

  updates: {
    url: app.updates.url,
  },

  extra: {
    appVariant: app.id,
    appEnvironment,
    isDevelopment,
    otaUpdateNumber,
    otaUpdateNumberDev: app.otaUpdateNumberDev,
    otaUpdateNumberProd: app.otaUpdateNumberProd,
    versionDev: app.versionDev,
    versionProd: app.versionProd,
    versionProdIos: app.versionProdIos,
    theme: app.theme,
    notifications: {
      androidChannelId: app.notifications.androidChannelId,
      firebaseConfigured: hasGoogleServicesFile,
    },
    eas: {
      projectId: app.projectId,
    },
  },
};

export default config;
