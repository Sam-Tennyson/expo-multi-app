import { useState } from 'react';

import { SharedLoginFields, SubmitState } from './types';

type LoginFormState = SharedLoginFields & {
  readonly submitState: SubmitState;
  readonly hasSharedCredentials: boolean;
  readonly setEmail: (value: string) => void;
  readonly setPassword: (value: string) => void;
  readonly submit: (extra?: object) => void;
};

const MIN_PASSWORD_LENGTH = 6;

/**
 * Shared credentials only. Variant-specific fields stay in the variant.
 */
export function useLoginForm(): LoginFormState {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const hasSharedCredentials = email.trim().length > 0 && password.length >= MIN_PASSWORD_LENGTH;
  const submit = (extra: object = {}): void => {
    if (!hasSharedCredentials) {
      return;
    }
    console.log('submit', { email, password, ...extra });
    setSubmitState('success');
  };
  return {
    email,
    password,
    submitState,
    hasSharedCredentials,
    setEmail,
    setPassword,
    submit,
  };
}
