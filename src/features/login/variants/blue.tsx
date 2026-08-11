import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ActionButton } from '@/components/ui/action-button';
import { CustomInput } from '@/components/ui/custom-input';
import { Spacing } from '@/constants/theme';

import { useLoginForm } from '../use-login-form';

/**
 * Blue-only field. Red never sees this type or this state.
 */
type BlueLoginExtra = {
  readonly workspaceId: string;
};

export function BlueLoginForm() {
  const { email, password, submitState, hasSharedCredentials, setEmail, setPassword, submit } =
    useLoginForm();
  const [workspaceId, setWorkspaceId] = useState('');
  const canSubmit = hasSharedCredentials && workspaceId.trim().length > 0;
  const submitBlueForm = (): void => {
    const extra: BlueLoginExtra = { workspaceId: workspaceId.trim() };
    submit(extra);
  };
  return (
    <ThemedView type="backgroundElement" style={styles.shell}>
      <View style={styles.hero}>
        <ThemedText type="smallBold" style={styles.heroTitle}>
          Blue login
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Shared credentials plus a Blue-only workspace field.
        </ThemedText>
      </View>
      <View style={styles.row}>
        <CustomInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Work email"
          radius={Spacing.five}
          value={email}
        />
        <CustomInput
          onChangeText={setPassword}
          placeholder="6+ char password"
          radius={Spacing.five}
          secureTextEntry
          value={password}
        />
        <CustomInput
          autoCapitalize="none"
          onChangeText={setWorkspaceId}
          placeholder="Workspace ID"
          radius={Spacing.five}
          value={workspaceId}
        />
      </View>
      <View style={styles.actions}>
        <ActionButton
          isDisabled={!canSubmit}
          isExpanded
          label="Sign in"
          onPress={submitBlueForm}
          radius={Spacing.five}
        />
        <ActionButton label="Forgot password?" onPress={() => undefined} variant="secondary" />
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {submitState === 'success'
          ? 'Blue submit included workspace ID.'
          : 'Workspace ID is required for Blue only.'}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.five,
  },
  hero: {
    gap: Spacing.one,
  },
  heroTitle: {
    fontSize: 18,
  },
  row: {
    gap: Spacing.two,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
