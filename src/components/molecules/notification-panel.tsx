'use client';

import { Notification } from '@/types';
import Alert from '../atoms/alert';

export default function NotificationPanel({
  notifications,
  onDone,
}: {
  notifications: Notification[],
  onDone: (uuid: string) => void,
}) {
  return (
    <section className='grid grid-cols-1 fixed bottom-4 left-4 right-4 gap-4 pointer-events-none z-50'>
      {notifications.reverse().map((notification) => (
        <Alert key={notification.uuid} className='pointer-events-auto' notification={notification} onDone={onDone} />
      ))}
    </section>
  );
}
