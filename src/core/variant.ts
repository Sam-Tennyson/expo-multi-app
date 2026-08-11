import { getAppVariantFromConfig } from '@/core/app-config';
import { AppVariant } from '@/core/app-variant';

/**
 * Returns the active white-label app. Defaults to red when extra is missing.
 */
export function getAppVariant(): AppVariant {
  return getAppVariantFromConfig();
}

/**
 * Picks the implementation for the active app. Adding a variant to APP_VARIANTS
 * forces every feature map to register it at compile time.
 */
export function resolveVariant<TValue>(
  variants: Record<AppVariant, TValue>,
): TValue {
  return variants[getAppVariant()];
}
