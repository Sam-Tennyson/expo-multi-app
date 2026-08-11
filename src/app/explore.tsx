import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppInfo } from '@/components/app-info';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UpdatesPanel } from '@/components/updates-panel';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Login } from '@/features/login';
import { useNotifications } from '@/hooks/use-notifications';

type AppExtra = {
  theme?: { primaryColor?: string };
  notifications?: { firebaseConfigured?: boolean };
};

export default function DiagnosticsScreen() {
  const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;
  const primaryColor = extra.theme?.primaryColor ?? '#3c87f7';
  const { permission, expoPushToken, lastEvent, error, register, scheduleTodoReminder } =
    useNotifications();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View>
            <ThemedText type="subtitle">POC diagnostics</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Confirm app identity, push delivery, and OTA isolation.
            </ThemedText>
          </View>

          <AppInfo />

          <ThemedView type="backgroundElement" style={styles.panel}>
            <ThemedText type="smallBold">Variant component reference</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Shared route, shared logic, app-specific presentation through a resolver.
            </ThemedText>
            <Login />
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.panel}>
            <ThemedText type="smallBold">Notifications</ThemedText>
            <ThemedText type="small">Permission: {permission}</ThemedText>
            <ThemedText type="small">
              Firebase Android file: {extra.notifications?.firebaseConfigured ? 'detected' : 'not supplied'}
            </ThemedText>
            <ThemedText selectable type="code" style={styles.token}>
              {expoPushToken ?? 'Enable notifications to create an Expo push token.'}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{lastEvent}</ThemedText>
            {error && <ThemedText type="small" style={styles.error}>{error}</ThemedText>}
            <View style={styles.actions}>
              <Pressable onPress={() => void register()} style={[styles.button, { backgroundColor: primaryColor }]}>
                <ThemedText style={styles.lightText}>Enable remote notifications</ThemedText>
              </Pressable>
              <Pressable
                onPress={() => void scheduleTodoReminder('The local notification path works.')}
                style={styles.secondaryButton}>
                <ThemedText>Send local test in 2 seconds</ThemedText>
              </Pressable>
            </View>
          </ThemedView>

          <UpdatesPanel primaryColor={primaryColor} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center' },
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth },
  content: { gap: Spacing.four, padding: Spacing.four, paddingBottom: BottomTabInset + Spacing.four },
  panel: { gap: Spacing.three, padding: Spacing.three, borderRadius: Spacing.three },
  token: { lineHeight: 18 },
  actions: { gap: Spacing.two },
  button: { alignItems: 'center', padding: Spacing.three, borderRadius: Spacing.two },
  secondaryButton: { alignItems: 'center', padding: Spacing.two },
  lightText: { color: '#fff', fontWeight: '700' },
  error: { color: '#c62828' },
});
