import { ReactNode } from 'react';

import { useAuth } from '@/core/auth';
import { LoginScreen } from '@/screens/login-screen';

export function AuthGate({ children }: { readonly children: ReactNode }) {
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}

