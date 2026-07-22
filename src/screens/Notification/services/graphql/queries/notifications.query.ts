import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($filter: String) {
    notifications(filter: $filter) {
      notifications {
        id
        title
        message
        type
        entity_type
        entity_id
        is_read
        data
        created_at
        updated_at
      }
      unread_count
    }
  }
`;
