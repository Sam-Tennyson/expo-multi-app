import { getAppExtra } from '@/core/app-config';

export type ProtectedPath = '/' | '/explore' | '/profile';

type AuthConfig = {
  readonly protectedRoutes?: readonly ProtectedPath[];
  readonly defaultProtectedRoute?: ProtectedPath;
};

const FALLBACK_DEFAULT_ROUTE: ProtectedPath = '/';

/**
 * Routes that require a session. An empty list means every tab is public.
 */
export function getProtectedRoutes(): readonly ProtectedPath[] {
  const auth = (getAppExtra().auth ?? {}) as AuthConfig;
  return auth.protectedRoutes ?? [];
}

/**
 * Returns true when this path must be signed in to view.
 */
export function isProtectedRoute(pathname: string): boolean {
  return getProtectedRoutes().includes(pathname as ProtectedPath);
}

export function getDefaultProtectedRoute(): ProtectedPath {
  const auth = (getAppExtra().auth ?? {}) as AuthConfig;
  return auth.defaultProtectedRoute ?? FALLBACK_DEFAULT_ROUTE;
}
