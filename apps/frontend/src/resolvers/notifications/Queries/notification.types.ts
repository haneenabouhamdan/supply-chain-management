import { NotificationStatus } from '../enums';

export interface NotificationsDto {
  notifications: NotificationDto[];
}

export interface NotificationDto {
  id?: string;
  createdAt: string;
  userId: string;
  messageId: string | null;
  title: string;
  text: string;
  channelId: string;
  status: NotificationStatus;
}
