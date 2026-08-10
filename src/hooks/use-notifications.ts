import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

type NotificationExtra = {
  androidChannelId?: string;
};

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export function useNotifications() {
  const [permission, setPermission] = useState<string>('unknown');
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastEvent, setLastEvent] = useState('No notification received yet');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    void Notifications.getPermissionsAsync().then((settings) => setPermission(settings.status));
    const received = Notifications.addNotificationReceivedListener((notification) => {
      setLastEvent(notification.request.content.title ?? 'Notification received');
    });
    const responded = Notifications.addNotificationResponseReceivedListener((response) => {
      const todoId = response.notification.request.content.data?.todoId;
      setLastEvent(todoId ? `Opened todo ${String(todoId)}` : 'Notification opened');
    });
    return () => {
      received.remove();
      responded.remove();
    };
  }, []);

  const register = useCallback(async () => {
    setError(null);
    if (Platform.OS === 'web') {
      setError('expo-notifications does not support web push.');
      return;
    }
    if (!Device.isDevice) {
      setError('Use a physical device for a remote push token.');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const extra = Constants.expoConfig?.extra?.notifications as NotificationExtra | undefined;
        await Notifications.setNotificationChannelAsync(extra?.androidChannelId ?? 'todos', {
          name: 'Todo reminders',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }

      const current = await Notifications.getPermissionsAsync();
      const result = current.granted ? current : await Notifications.requestPermissionsAsync();
      setPermission(result.status);
      if (!result.granted) {
        setError('Notification permission was not granted.');
        return;
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) throw new Error('EAS project ID is missing from app config.');
      const token = await Notifications.getExpoPushTokenAsync({ projectId });
      setExpoPushToken(token.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not register for notifications.');
    }
  }, []);

  const scheduleTodoReminder = useCallback(async (title: string, todoId?: string) => {
    if (Platform.OS === 'web') return false;
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title: 'Todo reminder', body: title, data: { todoId } },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });
      setLastEvent('Local reminder scheduled');
      return true;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not schedule the reminder.');
      return false;
    }
  }, []);

  return { permission, expoPushToken, lastEvent, error, register, scheduleTodoReminder };
}
