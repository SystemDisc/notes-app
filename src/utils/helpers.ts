import { Notification } from '@/types';

export const handleError = (e: unknown, addNotification: (notification: Notification) => Promise<void>) => {
  if (e instanceof Error) {
    addNotification({
      type: 'error',
      message: e.message,
    });
  } else {
    addNotification({
      type: 'error',
      message: 'An unknown error occurred.',
    });
  }
}