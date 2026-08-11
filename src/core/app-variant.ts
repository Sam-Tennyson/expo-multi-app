export const APP_VARIANTS = ['red', 'blue'] as const;

export type AppVariant = (typeof APP_VARIANTS)[number];

export function isAppVariant(value: string): value is AppVariant {
  return (APP_VARIANTS as readonly string[]).includes(value);
}

