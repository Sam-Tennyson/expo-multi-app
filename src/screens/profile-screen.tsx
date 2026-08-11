import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ActionButton } from '@/components/ui/action-button';
import CustomHeader from '@/components/ui/custom-header';
import { Spacing } from '@/constants/theme';
import { getAppName, getAppVariantFromConfig } from '@/core/app-config';
import { useAuth } from '@/core/auth';
import { commonStyles } from '@/core/common-styles';
import { getDefaultProtectedRoute } from '@/core/route-access';

export function ProfileScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const signOutAndLeave = async (): Promise<void> => {
    await signOut();
    router.replace(getDefaultProtectedRoute());
  };
  return (
    <ThemedView style={commonStyles.screen}>
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView contentContainerStyle={commonStyles.content} keyboardShouldPersistTaps="handled">
          <CustomHeader />
          <ThemedView type="backgroundElement" style={styles.panel}>
            <ThemedText type="smallBold">Signed in</ThemedText>
            <HintRow title="App" hint={<ThemedText type="code">{getAppName()}</ThemedText>} />
            <HintRow
              title="Variant"
              hint={<ThemedText type="code">{getAppVariantFromConfig()}</ThemedText>}
            />
            <HintRow title="Email" hint={<ThemedText type="code">{session?.email ?? '—'}</ThemedText>} />
            {session?.workspaceId ? (
              <HintRow
                title="Workspace"
                hint={<ThemedText type="code">{session.workspaceId}</ThemedText>}
              />
            ) : null}
            <ActionButton label="Log out" onPress={() => void signOutAndLeave()} />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
});
