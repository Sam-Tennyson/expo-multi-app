import Constants from "expo-constants";

export const APP_VARIANTS = ["red", "blue"] as const;

export type AppVariant = (typeof APP_VARIANTS)[number];

type AppExtra = {
  readonly appVariant?: string;
};

function isAppVariant(value: string): value is AppVariant {
  return (APP_VARIANTS as readonly string[]).includes(value);
}

/**
 * Returns the active white-label app. Defaults to red when extra is missing.
 */
export function getAppVariant(): AppVariant {
  const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;
  return isAppVariant(extra.appVariant ?? "")
    ? (extra?.appVariant as AppVariant)
    : "red";
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
