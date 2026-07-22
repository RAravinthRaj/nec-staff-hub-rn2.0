import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const PUSH_NOTIFICATIONS_ENABLED_KEY = "push_notifications_enabled";
export const EXPO_PUSH_TOKEN_KEY = "expo_push_token";

let notificationHandlerConfigured = false;

const loadNotificationsModule = () => {
  try {
    return require("expo-notifications") as typeof import("expo-notifications");
  } catch (_) {
    return null;
  }
};

const loadExpoConstantsModule = () => {
  try {
    const module = require("expo-constants") as typeof import("expo-constants");
    return module.default;
  } catch (_) {
    return null;
  }
};

export const configurePushNotifications = () => {
  const Notifications = loadNotificationsModule();

  if (!Notifications || notificationHandlerConfigured) {
    return Boolean(Notifications);
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  notificationHandlerConfigured = true;
  return true;
};

export const registerForPushNotificationsAsync = async () => {
  try {
    const Notifications = loadNotificationsModule();
    const Constants = loadExpoConstantsModule();

    if (!Notifications) {
      return null;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return null;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ||
      Constants?.easConfig?.projectId;

    const token = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );

    return token.data;
  } catch (_) {
    return null;
  }
};

export const getPushNotificationsEnabled = async () => {
  const value = await SecureStore.getItemAsync(PUSH_NOTIFICATIONS_ENABLED_KEY);
  return value === "true";
};

export const setPushNotificationsEnabled = async (enabled: boolean) => {
  await SecureStore.setItemAsync(
    PUSH_NOTIFICATIONS_ENABLED_KEY,
    enabled ? "true" : "false",
  );
};

export const getStoredExpoPushToken = async () => {
  return SecureStore.getItemAsync(EXPO_PUSH_TOKEN_KEY);
};

export const setStoredExpoPushToken = async (token: string) => {
  await SecureStore.setItemAsync(EXPO_PUSH_TOKEN_KEY, token);
};

export const clearStoredExpoPushToken = async () => {
  await SecureStore.deleteItemAsync(EXPO_PUSH_TOKEN_KEY);
};
