import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { AppVariant, isAppVariant } from '@/core/app-variant';

type AppTheme = {
  readonly primaryColor?: string;
};

type AppNotifications = {
  readonly androidChannelId?: string;
  readonly firebaseConfigured?: boolean;
};

type AppExtra = {
  readonly appVariant?: string;
  readonly appEnvironment?: string;
  readonly isDevelopment?: boolean;
  readonly otaUpdateNumber?: string;
  readonly otaUpdateNumberDev?: string;
  readonly otaUpdateNumberProd?: string;
  readonly versionDev?: string;
  readonly versionProd?: string;
  readonly versionProdIos?: string;
  readonly theme?: AppTheme;
  readonly notifications?: AppNotifications;
  readonly eas?: {
    readonly projectId?: string;
  };
};

export type AppInfo = {
  readonly name: string;
  readonly slug: string;
  readonly scheme: string;
  readonly version: string;
  readonly appVariant: AppVariant;
  readonly appEnvironment: string;
  readonly bundleId: string;
  readonly buildNumber: string;
  readonly primaryColor: string;
  readonly projectId: string;
  readonly otaUpdateNumber: string;
  readonly otaDevelopment: string;
  readonly otaProduction: string;
};

const FALLBACK_APP_NAME = 'Todo POC';
const FALLBACK_PRIMARY_COLOR = '#3c87f7';

export function getExpoConfig() {
  return Constants.expoConfig;
}

export function getAppExtra(): AppExtra {
  return (getExpoConfig()?.extra ?? {}) as AppExtra;
}

export function getAppName(): string {
  return getExpoConfig()?.name ?? FALLBACK_APP_NAME;
}

export function getAppTheme() {
  return getAppExtra().theme ?? {};
}

export function getPrimaryColor(): string {
  return getAppTheme().primaryColor ?? FALLBACK_PRIMARY_COLOR;
}

export function getAppVariantFromConfig(): AppVariant {
  const value = getAppExtra().appVariant ?? '';
  return isAppVariant(value) ? value : 'red';
}

export function getNotificationConfig(): AppNotifications {
  return getAppExtra().notifications ?? {};
}

export function getEasProjectId(): string | undefined {
  return getAppExtra().eas?.projectId;
}

export function getAppInfo(): AppInfo | null {
  const expoConfig = getExpoConfig();
  if (!expoConfig) {
    return null;
  }

  const extra = getAppExtra();
  const bundleId =
    Platform.OS === 'ios'
      ? (expoConfig.ios?.bundleIdentifier ?? '—')
      : Platform.OS === 'android'
        ? (expoConfig.android?.package ?? '—')
        : (expoConfig.ios?.bundleIdentifier ?? expoConfig.android?.package ?? '—');
  const buildNumber =
    Platform.OS === 'ios'
      ? (expoConfig.ios?.buildNumber ?? '—')
      : Platform.OS === 'android'
        ? String(expoConfig.android?.versionCode ?? '—')
        : (expoConfig.ios?.buildNumber ?? String(expoConfig.android?.versionCode ?? '—'));

  return {
    name: expoConfig.name ?? '—',
    slug: expoConfig.slug ?? '—',
    scheme: String(expoConfig.scheme ?? '—'),
    version:
      Platform.OS === 'ios'
        ? (expoConfig.ios?.version ?? expoConfig.version ?? '—')
        : (expoConfig.version ?? '—'),
    appVariant: getAppVariantFromConfig(),
    appEnvironment: extra.appEnvironment ?? '—',
    bundleId,
    buildNumber,
    primaryColor: extra.theme?.primaryColor ?? '—',
    projectId: extra.eas?.projectId ?? '—',
    otaUpdateNumber: extra.otaUpdateNumber ?? '—',
    otaDevelopment: extra.otaUpdateNumberDev ?? '—',
    otaProduction: extra.otaUpdateNumberProd ?? '—',
  };
}
