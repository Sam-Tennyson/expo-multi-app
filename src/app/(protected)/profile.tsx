import { AuthGate } from '@/components/auth-gate';
import { ProfileScreen } from '@/screens/profile-screen';

export default function ProfileRoute() {
  return (
    <AuthGate>
      <ProfileScreen />
    </AuthGate>
  );
}
