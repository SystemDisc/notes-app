import { Appointment, Client } from '@/types';

export const clients: Client[] = [
  {
    id: 1,
    name: 'Timothy Zorn',
    image: '/images/zorn.png',
  },
];

export const appointments: Appointment[] = [
  {
    id: 1,
    startDate: new Date('2024-03-27T00:00:00.000Z'),
    clientId: 1,
  },
];