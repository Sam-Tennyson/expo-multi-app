import * as Updates from 'expo-updates';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export function UpdatesPanel({ primaryColor }: { primaryColor: string }) {
  const [status, setStatus] = useState('Ready');
  const [isBusy, setIsBusy] = useState(false);
  const [hasDownloadedUpdate, setHasDownloadedUpdate] = useState(false);

  const checkForUpdate = async () => {
    if (!Updates.isEnabled) {
      setStatus('OTA updates are disabled in Expo Go/local debug mode.');
      return;
    }
    setIsBusy(true);
    try {
      setStatus('Checking…');
      const check = await Updates.checkForUpdateAsync();
      if (!check.isAvailable) {
        setStatus('This build already has the latest compatible update.');
        return;
      }
      setStatus('Downloading…');
      const result = await Updates.fetchUpdateAsync();
      setHasDownloadedUpdate(result.isNew);
      setStatus(result.isNew ? 'Update downloaded. Restart to apply it.' : 'Update already cached.');
    } catch (caught) {
      setStatus(caught instanceof Error ? caught.message : 'Update check failed.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <ThemedView type="backgroundElement" style={styles.panel}>
      <ThemedText type="smallBold">EAS Update</ThemedText>
      <HintRow title="Enabled" hint={<ThemedText type="code">{String(Updates.isEnabled)}</ThemedText>} />
      <HintRow title="Channel" hint={<ThemedText type="code">{Updates.channel ?? '—'}</ThemedText>} />
      <HintRow
        title="Runtime"
        hint={<ThemedText type="code">{Updates.runtimeVersion ?? '—'}</ThemedText>}
      />
      <HintRow
        title="Source"
        hint={<ThemedText type="code">{Updates.isEmbeddedLaunch ? 'embedded' : 'OTA'}</ThemedText>}
      />
      <HintRow title="Update ID" hint={<ThemedText type="code">{Updates.updateId ?? '—'}</ThemedText>} />
      <ThemedText type="small" themeColor="textSecondary">{status}</ThemedText>
      <View style={styles.actions}>
        <Pressable
          disabled={isBusy}
          onPress={checkForUpdate}
          style={[styles.button, { backgroundColor: primaryColor }, isBusy && styles.disabled]}>
          <ThemedText style={styles.buttonText}>{isBusy ? 'Working…' : 'Check & download'}</ThemedText>
        </Pressable>
        {hasDownloadedUpdate && (
          <Pressable onPress={() => void Updates.reloadAsync()} style={styles.secondaryButton}>
            <ThemedText>Restart now</ThemedText>
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  panel: { gap: Spacing.three, padding: Spacing.three, borderRadius: Spacing.three },
  actions: { gap: Spacing.two },
  button: { alignItems: 'center', borderRadius: Spacing.two, padding: Spacing.three },
  secondaryButton: { alignItems: 'center', padding: Spacing.two },
  buttonText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.55 },
});
