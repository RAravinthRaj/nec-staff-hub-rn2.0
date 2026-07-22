import { gql } from "@apollo/client";

export const MARK_NOTIFICATION_READ = gql`
  mutation MarkNotificationRead($notificationId: Int!) {
    markNotificationRead(notification_id: $notificationId) {
      success
      notification_id
    }
  }
`;

export const REGISTER_PUSH_TOKEN = gql`
  mutation RegisterPushToken($token: String!, $platform: String!) {
    registerPushToken(token: $token, platform: $platform) {
      success
    }
  }
`;

export const UNREGISTER_PUSH_TOKEN = gql`
  mutation UnregisterPushToken($token: String!) {
    unregisterPushToken(token: $token) {
      success
    }
  }
`;
