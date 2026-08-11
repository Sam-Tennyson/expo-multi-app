import { StyleSheet, View } from 'react-native';

import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getAppInfo } from '@/core/app-config';

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
