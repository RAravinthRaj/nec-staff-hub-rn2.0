/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { AuthApi } from "@/services/authApi";

class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }

    return NotificationService.instance;
  }

  async getNotificationsAPI(filter?: string) {
    try {
      const res = await AuthApi.getNotifications(filter);
      return {
        payload: {
          notifications: res?.notifications || [],
          unreadCount: Number(res?.unreadCount || 0),
        },
      };
    } catch (err) {
      return {
        payload: {
          notifications: [],
          unreadCount: 0,
        },
      };
    }
  }

  async markNotificationReadAPI(notificationId: number) {
    return AuthApi.markNotificationAsRead(notificationId);
  }

  async registerPushTokenAPI(token: string, platform: string) {
    return { payload: { success: true } };
  }

  async unregisterPushTokenAPI(token: string) {
    return { payload: { success: true } };
  }
}

export default NotificationService.getInstance();
