import { gql } from '@apollo/client';

export const SAVE_NOTIFICATION = gql`
  mutation SendfbNotification(
    $token: String!
    $notificationInput: NotificationInput!
  ) {
    sendfbNotification(token: $token, NotificationInput: $notificationInput) {
      message
    }
  }
`;

export const FETCH_NOTIFICATIONS = gql`
  query Notifications($filters: NotificationsFilters!) {
    notifications(filters: $filters) {
      id
      userId
      createdAt
      messageId
      title
      text
      channelId
      status
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($updateStatusId: String!, $status: String!) {
    updateStatus(id: $updateStatusId, status: $status) {
      message
    }
  }
`;
