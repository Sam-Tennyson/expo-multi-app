import Constants from 'expo-constants';
import { Platform, StyleSheet, View } from 'react-native';

import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type AppThemeExtra = {
  readonly primaryColor?: string;
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
  readonly theme?: AppThemeExtra;
  readonly eas?: {
    readonly projectId?: string;
  };
};

type AppInfoRow = {
  readonly name: string;
  readonly slug: string;
  readonly scheme: string;
  readonly version: string;
  readonly appVariant: string;
  readonly appEnvironment: string;
  readonly bundleId: string;
  readonly buildNumber: string;
  readonly primaryColor: string;
  readonly projectId: string;
  readonly otaUpdateNumber: string;
  readonly otaDevelopment: string;
  readonly otaProduction: string;
};

/**
 * Reads the active Expo app config and normalizes variant-specific fields.
 */
function getAppInfo(): AppInfoRow | null {
  const expoConfig = Constants.expoConfig;
  if (!expoConfig) {
    return null;
  }
  const extra = (expoConfig.extra ?? {}) as AppExtra;
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
    appVariant: extra.appVariant ?? '—',
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

/**
 * Displays the active multi-app variant configuration from Expo Constants.
 */
export function AppInfo() {
  const appInfo = getAppInfo();
  if (!appInfo) {
    return (
      <ThemedView type="backgroundElement" style={styles.container}>
        <ThemedText type="small">App config unavailable</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.swatch, { backgroundColor: appInfo.primaryColor }]} />
        <ThemedText type="smallBold">{appInfo.name}</ThemedText>
      </View>
      <HintRow title="Variant" hint={<ThemedText type="code">{appInfo.appVariant}</ThemedText>} />
      <HintRow title="Environment" hint={<ThemedText type="code">{appInfo.appEnvironment}</ThemedText>} />
      <HintRow title="Slug" hint={<ThemedText type="code">{appInfo.slug}</ThemedText>} />
      <HintRow title="Scheme" hint={<ThemedText type="code">{appInfo.scheme}</ThemedText>} />
      <HintRow title="Version" hint={<ThemedText type="code">{appInfo.version}</ThemedText>} />
      <HintRow title="Bundle ID" hint={<ThemedText type="code">{appInfo.bundleId}</ThemedText>} />
      <HintRow title="Build" hint={<ThemedText type="code">{appInfo.buildNumber}</ThemedText>} />
      <HintRow
        title="OTA active"
        hint={<ThemedText type="code">{appInfo.otaUpdateNumber}</ThemedText>}
      />
      <HintRow
        title="OTA (dev/prod)"
        hint={
          <ThemedText type="code">
            {appInfo.otaDevelopment}/{appInfo.otaProduction}
          </ThemedText>
        }
      />
      <HintRow title="Project ID" hint={<ThemedText type="code">{appInfo.projectId}</ThemedText>} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  swatch: {
    width: Spacing.three,
    height: Spacing.three,
    borderRadius: Spacing.half,
  },
});
