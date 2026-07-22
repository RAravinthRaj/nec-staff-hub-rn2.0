/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { PageContainer } from "@/components";
import { Body, Header, Chip } from "./components";
import { NOTIFICATION_CONFIG } from "./config";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useNotificationStore } from "./stores";
import { Loader } from "@/components";
import { showToast } from "@/utils";

export const NotificationScreen = ({ navigation }: any) => {
  const [category, setCategory] = useState("All");
  const { notifications, loading, error, fetchNotifications, markAsRead } =
    useNotificationStore();

  const _goBack = () => {
    return navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(category === "Unread" ? "unread" : "all");
    }, [category, fetchNotifications]),
  );

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  return (
    <>
      <Header goBack={_goBack} />
      <PageContainer isLightStatusBar={true}>
        <Chip category={category} onChange={setCategory} />
        <ScrollView>
          {loading ? (
            <Loader />
          ) : (
            <Body
              notifications={notifications}
              onRead={markAsRead}
              emptyTitle={NOTIFICATION_CONFIG.emptyTitle}
            />
          )}
        </ScrollView>
      </PageContainer>
    </>
  );
};
