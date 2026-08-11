import { usePathname, useRouter } from 'expo-router';

import { ActionButton } from '@/components/ui/action-button';
import { useAuth } from '@/core/auth';
import { getProtectedRoutes } from '@/core/route-access';

/**
 * Shows Log in when this app has protected routes and the user has no session.
 */
export function AuthEntryButton() {
  const pathname = usePathname();
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();
  const hasProtectedRoutes = getProtectedRoutes().length > 0;
  const canShowLogin =
    isReady && !isAuthenticated && hasProtectedRoutes && pathname !== '/login';
  if (!canShowLogin) {
    return null;
  }
  return <ActionButton label="Log in" onPress={() => router.push('/login')} variant="secondary" />;
}
