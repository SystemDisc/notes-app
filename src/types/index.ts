export type NotificationType = 'error' | 'success';
export interface Notification {
  type: NotificationType;
  message: string;
  uuid?: string;
}

export interface Client {
  id: number;
  name: string;
  image: string;
}

export interface Appointment {
  id: number;
  startDate: Date;
  clientId: number;
}

export interface ErrorResponse {
  error: string;
}

export interface SuccessResponse {
  success: string;
}