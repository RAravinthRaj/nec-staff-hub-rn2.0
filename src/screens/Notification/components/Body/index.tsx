/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useMemo, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Fonts } from "@/assets";
import { NotificationItem } from "../../stores";

export interface IBody {
  notifications: NotificationItem[];
  onRead: (notificationId: number) => Promise<void>;
  emptyTitle: string;
}

export const Body = ({ notifications, onRead, emptyTitle }: IBody) => {
  const { theme } = useTheme();
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const _renderTime = (time: string) => {
    const createdAt = new Date(time);
    const now = new Date();

    const diffMs = Math.abs(now.getTime() - createdAt.getTime());

    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffDay > 0) {
      return `${diffDay}d`;
    }

    if (diffHr > 0) {
      return `${diffHr}h`;
    }

    return `${diffMin}m`;
  };

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [notifications],
  );

  const openNotification = async (notification: NotificationItem) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      await onRead(notification.id);
    }
  };

  const _renderSingleData = (notification: NotificationItem, index: number) => {
    const isLast = index === notifications.length - 1;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={StyleSheet.flatten([
          S.notificationContainer,
          {
            borderBottomWidth: !isLast ? 0.5 : 0,
            backgroundColor:
              !notification.isRead
                ? theme.colors.tertiaryBackground
                : theme.colors.white,
            borderColor: theme.colors.border,
            borderTopLeftRadius: index == 0 ? 10 : 0,
            borderTopRightRadius: index == 0 ? 10 : 0,
            borderBottomLeftRadius: index == notifications.length - 1 ? 10 : 0,
            borderBottomRightRadius: index == notifications.length - 1 ? 10 : 0,
          },
        ])}
        onPress={() => {
          openNotification(notification);
        }}
      >
        <View style={S.notificationDetailContainer}>
          <View style={S.IconContainer}>
            <Icon
              type="ant-design"
              name="message"
              size={30}
              color={
                !notification.isRead
                  ? theme.colors.black
                  : theme.colors.border
              }
            />
          </View>
          <View style={S.textContainer}>
            <Text
              style={StyleSheet.flatten([
                S.titleText,
                {
                  fontFamily:
                    !notification.isRead
                      ? Fonts.bold
                      : Fonts.regular,
                },
              ])}
            >
              {notification.title}
            </Text>
            <Text style={S.text} numberOfLines={2}>
              {notification.message}
            </Text>
          </View>
        </View>

        <Text style={S.dateText}>{_renderTime(notification.createdAt)}</Text>
      </TouchableOpacity>
    );
  };

  const _renderData = () => {
    if (sortedNotifications.length === 0) {
      return (
        <View style={S.emptyContainer}>
          <Text style={S.emptyText}>{emptyTitle}</Text>
        </View>
      );
    }

    return (
      <View>
        {sortedNotifications.map((notification, index) => {
          return (
            <View key={notification.id}>
              {_renderSingleData(notification, index)}
            </View>
          );
        })}
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderData()}
      </View>
    );
  };

  return (
    <>
      <ScrollView
        style={StyleSheet.flatten([
          S.container,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderHeader()}
      </ScrollView>

      <Modal
        visible={Boolean(selectedNotification)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedNotification(null)}
      >
        <View style={S.modalOverlay}>
          <View
            style={StyleSheet.flatten([
              S.modalContainer,
              { backgroundColor: theme.colors.white },
            ])}
          >
            <Text style={S.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={S.modalText}>{selectedNotification?.message}</Text>

            <TouchableOpacity
              style={StyleSheet.flatten([
                S.modalButton,
                { backgroundColor: theme.colors.primary },
              ])}
              onPress={() => setSelectedNotification(null)}
              activeOpacity={0.8}
            >
              <Text
                style={StyleSheet.flatten([
                  S.modalButtonText,
                  { color: theme.colors.white },
                ])}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
