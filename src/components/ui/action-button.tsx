import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { getPrimaryColor } from '@/core/app-config';

type ActionButtonVariant = 'primary' | 'secondary';

type ActionButtonProps = {
  readonly label: string;
  readonly onPress: () => void;
  readonly isDisabled?: boolean;
  readonly isExpanded?: boolean;
  readonly variant?: ActionButtonVariant;
  readonly color?: string;
  readonly radius?: number;
};

const DISABLED_OPACITY = 0.45;

/**
 * Shared action control. Variants pass label and shape; brand color comes from app config.
 */
export function ActionButton({
  label,
  onPress,
  isDisabled = false,
  isExpanded = false,
  variant = 'primary',
  color = getPrimaryColor(),
  radius = Spacing.two,
}: ActionButtonProps) {
  if (variant === 'secondary') {
    return (
      <Pressable disabled={isDisabled} onPress={onPress} style={styles.secondary}>
        <ThemedText type="smallBold" style={{ color }}>
          {label}
        </ThemedText>
      </Pressable>
    );
  }
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.primary,
        { backgroundColor: color, borderRadius: radius },
        isExpanded && styles.expanded,
        isDisabled && styles.disabled,
      ]}>
      <ThemedText style={styles.primaryLabel}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    padding: Spacing.three,
  },
  expanded: {
    flex: 1,
  },
  primaryLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  secondary: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
});
