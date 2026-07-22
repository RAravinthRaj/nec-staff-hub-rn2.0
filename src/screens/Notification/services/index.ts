import {
  getNotifications,
  markNotificationRead,
  registerPushToken,
  unregisterPushToken,
} from "./graphql";

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
    return getNotifications(filter);
  }

  async markNotificationReadAPI(notificationId: number) {
    return markNotificationRead(notificationId);
  }

  async registerPushTokenAPI(token: string, platform: string) {
    return registerPushToken(token, platform);
  }

  async unregisterPushTokenAPI(token: string) {
    return unregisterPushToken(token);
  }
}

export default NotificationService.getInstance();
