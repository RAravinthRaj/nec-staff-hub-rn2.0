/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Attendance Submitted",
    message: "Attendance for Period 1 (Data Structures - CSE A) has been recorded.",
    type: "ATTENDANCE",
    isRead: false,
    createdAt: "2025-07-22T09:15:00Z",
  },
  {
    id: 2,
    title: "Period Reminder",
    message: "You have Operating Systems (CSE B) scheduled for Period 3 at 11:00 AM.",
    type: "SCHEDULE",
    isRead: false,
    createdAt: "2025-07-22T10:45:00Z",
  },
  {
    id: 3,
    title: "HOD Absentee Report Ready",
    message: "Daily absentee summary for CSE Department has been compiled.",
    type: "REPORT",
    isRead: true,
    createdAt: "2025-07-21T16:00:00Z",
  },
];

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
    const list = filter === "unread" 
      ? MOCK_NOTIFICATIONS.filter(n => !n.isRead)
      : MOCK_NOTIFICATIONS;

    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

    return {
      payload: {
        notifications: list,
        unreadCount,
      },
    };
  }

  async markNotificationReadAPI(notificationId: number) {
    const found = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
    if (found) found.isRead = true;
    return { payload: { success: true } };
  }

  async registerPushTokenAPI(token: string, platform: string) {
    return { payload: { success: true } };
  }

  async unregisterPushTokenAPI(token: string) {
    return { payload: { success: true } };
  }
}

export default NotificationService.getInstance();
