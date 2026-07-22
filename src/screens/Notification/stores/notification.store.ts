import { create } from "zustand";
import NotificationService from "../services";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: string;
  entityType?: string | null;
  entityId?: number | null;
  isRead: boolean;
  data?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  registerLoading: boolean;
  fetchNotifications: (filter?: "all" | "unread") => Promise<void>;
  markAsRead: (notificationId: number) => Promise<void>;
  registerPushToken: (token: string, platform: string) => Promise<void>;
  unregisterPushToken: (token: string) => Promise<void>;
  resetNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  registerLoading: false,

  fetchNotifications: async (filter = "all") => {
    set({ loading: true, error: null });

    try {
      const res = await NotificationService.getNotificationsAPI(
        filter === "unread" ? "unread" : undefined,
      );
      set({
        notifications: res?.payload?.notifications ?? [],
        unreadCount: Number(res?.payload?.unreadCount ?? 0),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch notifications" });
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (notificationId: number) => {
    try {
      await NotificationService.markNotificationReadAPI(notificationId);
      const nextNotifications = get().notifications.map((item) =>
        item.id === notificationId ? { ...item, isRead: true } : item,
      );
      set({
        notifications: nextNotifications,
        unreadCount: Math.max(
          0,
          nextNotifications.filter((item) => !item.isRead).length,
        ),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to mark notification as read" });
      throw err;
    }
  },

  registerPushToken: async (token: string, platform: string) => {
    set({ registerLoading: true });

    try {
      await NotificationService.registerPushTokenAPI(token, platform);
    } finally {
      set({ registerLoading: false });
    }
  },

  unregisterPushToken: async (token: string) => {
    set({ registerLoading: true });

    try {
      await NotificationService.unregisterPushTokenAPI(token);
    } finally {
      set({ registerLoading: false });
    }
  },

  resetNotifications: () => {
    set({
      notifications: [],
      unreadCount: 0,
      loading: false,
      error: null,
      registerLoading: false,
    });
  },
}));
