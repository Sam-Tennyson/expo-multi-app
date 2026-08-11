import { resolveVariant } from '@/core/variant';

import { BlueLoginForm } from './variants/blue';
import { RedLoginForm } from './variants/red';

/**
 * Shared login route. Each variant owns its own fields and validation.
 */
export function Login() {
  const LoginForm = resolveVariant({
    blue: BlueLoginForm,
    red: RedLoginForm,
  });
  return <LoginForm />;
}
