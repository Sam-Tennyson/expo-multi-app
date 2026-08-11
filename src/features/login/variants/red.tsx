import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ActionButton } from '@/components/ui/action-button';
import { CustomInput } from '@/components/ui/custom-input';
import { Spacing } from '@/constants/theme';

import { useLoginForm } from '../use-login-form';

export function RedLoginForm() {
  const { email, password, submitState, hasSharedCredentials, setEmail, setPassword, submit } =
    useLoginForm();
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="smallBold">Red login</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Shared credentials only. No extra fields.
        </ThemedText>
      </View>
      <CustomInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <CustomInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        value={password}
      />
      <ActionButton
        isDisabled={!hasSharedCredentials}
        label="Continue"
        onPress={() => submit()}
      />
      <ThemedText type="small" themeColor="textSecondary">
        {submitState === 'success'
          ? 'Shared submit logic executed successfully.'
          : 'Password must be at least 6 characters.'}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  header: {
    gap: Spacing.one,
  },
});
