import { getAppVariant } from '@/core/variant';

import { BlueLoginForm } from './variants/blue';
import { RedLoginForm } from './variants/red';

const loginForms = {
  blue: BlueLoginForm,
  red: RedLoginForm,
} as const;

const ActiveLoginForm = loginForms[getAppVariant()];

/**
 * Shared login route. Each variant owns its own fields and validation.
 */
export function Login() {
  return <ActiveLoginForm />;
}
