import { apolloClient } from "../../../../clients";
import { getGraphqlError, getItemInLocalStorage } from "../../../../utils";
import { GET_NOTIFICATIONS } from "./queries";

export const getNotifications = async (filter?: string) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.query<any>({
      query: GET_NOTIFICATIONS,
      variables: {
        filter: filter || null,
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const payload = data?.notifications;

    return {
      payload: {
        notifications: (payload?.notifications ?? []).map((item: any) => ({
          id: Number(item?.id),
          title: item?.title ?? "",
          message: item?.message ?? "",
          type: item?.type ?? "",
          entityType: item?.entity_type ?? "",
          entityId: item?.entity_id ? Number(item.entity_id) : null,
          isRead: Boolean(item?.is_read),
          data: item?.data ?? null,
          createdAt: item?.created_at
            ? new Date(Number(item.created_at)).toISOString()
            : new Date().toISOString(),
          updatedAt: item?.updated_at
            ? new Date(Number(item.updated_at)).toISOString()
            : null,
        })),
        unreadCount: Number(payload?.unread_count ?? 0),
      },
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while fetching notifications.";
    throw new Error(msg);
  }
};

import { MARK_NOTIFICATION_READ } from "./mutations";

export const markNotificationRead = async (notificationId: number) => {
  try {
    const token = await getItemInLocalStorage("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data } = await apolloClient.mutate<any>({
      mutation: MARK_NOTIFICATION_READ,
      variables: {
        notificationId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      payload: data?.markNotificationRead ?? null,
    };
  } catch (err: any) {
    const msg =
      getGraphqlError(err) ||
      "An error occurred while marking notification as read.";
    throw new Error(msg);
  }
};
