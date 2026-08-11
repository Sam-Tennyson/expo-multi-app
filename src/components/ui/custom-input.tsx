import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const INPUT_MIN_HEIGHT = 48;

type CustomInputProps = Omit<TextInputProps, 'placeholderTextColor'> & {
  readonly radius?: number;
};

/**
 * Shared text field. Variants pass radius and input props; theme colors stay here.
 */
export function CustomInput({
  radius = Spacing.two,
  style,
  ...inputProps
}: CustomInputProps) {
  const theme = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      style={[
        styles.input,
        {
          color: theme.text,
          backgroundColor: theme.background,
          borderRadius: radius,
        },
        style,
      ]}
      {...inputProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: INPUT_MIN_HEIGHT,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
});
