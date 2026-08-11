import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getAppVariant } from '@/core/variant';

export type AuthSession = {
  readonly email: string;
  readonly workspaceId?: string;
};

type AuthContextValue = {
  readonly isReady: boolean;
  readonly isAuthenticated: boolean;
  readonly session: AuthSession | null;
  readonly signIn: (session: AuthSession) => Promise<void>;
  readonly signOut: () => Promise<void>;
};

const AUTH_STORAGE_PREFIX = 'auth-session';
const LEGACY_AUTH_VALUE = 'authenticated';
const AuthContext = createContext<AuthContextValue | null>(null);

function getAuthStorageKey(): string {
  return `${AUTH_STORAGE_PREFIX}:${getAppVariant()}`;
}

function parseStoredSession(value: string | null): AuthSession | null {
  if (!value) {
    return null;
  }
  if (value === LEGACY_AUTH_VALUE) {
    return { email: 'signed-in' };
  }
  try {
    const parsed = JSON.parse(value) as AuthSession;
    if (typeof parsed.email === 'string' && parsed.email.length > 0) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let isMounted = true;
    void AsyncStorage.getItem(getAuthStorageKey())
      .then((value) => {
        if (!isMounted) {
          return;
        }
        setSession(parseStoredSession(value));
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = useCallback(async (nextSession: AuthSession) => {
    await AsyncStorage.setItem(getAuthStorageKey(), JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(getAuthStorageKey());
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      isAuthenticated: session !== null,
      session,
      signIn,
      signOut,
    }),
    [isReady, session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within AuthProvider.');
  }
  return value;
}
