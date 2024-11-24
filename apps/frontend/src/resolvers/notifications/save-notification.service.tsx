import { useMutation } from '@apollo/client';
import { SAVE_NOTIFICATION } from './Queries';
import { NotificationStatus } from './enums';

interface CreateNotificationDto {
  notificationInput: {
    channelId?: string;
    messageId?: string;
    challengeId?: string;
    status: NotificationStatus;
    text: string;
    title: string;
    userId: string;
  };
  token: string;
}

export const useSaveNotification = () => {
  const [saveNotification, { data, loading, error }] =
    useMutation(SAVE_NOTIFICATION);
  return {
    saveNotification: (createNotificationDto: CreateNotificationDto) =>
      saveNotification({ variables: { createNotificationDto } }),
    data,
    loading,
    error,
  };
};
