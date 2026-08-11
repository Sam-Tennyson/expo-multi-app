import { Redirect } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import CustomHeader from '@/components/ui/custom-header';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getDefaultCredentials } from '@/core/app-config';
import { useAuth } from '@/core/auth';
import { getDefaultProtectedRoute } from '@/core/route-access';
import { Login } from '@/features/login';

export function LoginScreen() {
  const { isReady, isAuthenticated } = useAuth();
  const credentials = getDefaultCredentials();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href={getDefaultProtectedRoute()} />;
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <CustomHeader />
          <View style={styles.copy}>
            <ThemedText type="smallBold">Login required</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Sign in with the default credentials for this app to access protected content.
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Demo credentials: {credentials.email ?? '—'} / {credentials.password ?? '—'}
            </ThemedText>
            {credentials.workspaceId ? (
              <ThemedText type="small" themeColor="textSecondary">
                Workspace ID: {credentials.workspaceId}
              </ThemedText>
            ) : null}
          </View>
          <Login />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center' },
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth },
  content: { gap: Spacing.four, padding: Spacing.four },
  copy: { gap: Spacing.one },
});

