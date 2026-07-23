/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useMemo, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { STAFF_TAB_CONFIG, HOD_TAB_CONFIG } from "@/config/tab.config";
import { CustomTabBar } from "../CustomTabBar";
import { ProfileScreen } from "@/screens";
import { useAuthStore } from "@/store/useAuthStore";
import { useTheme } from "@rneui/themed";

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ onLogout }: { onLogout?: () => void }) => {
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();

  const tabConfig = useMemo(() => {
    return user?.role === "HOD" ? HOD_TAB_CONFIG : STAFF_TAB_CONFIG;
  }, [user?.role]);

  const renderTabBar = useCallback(
    (props: any) => <CustomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        lazy: false,
        freezeOnBlur: true,
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
      tabBar={renderTabBar}
    >
      {tabConfig.map((tab) =>
        tab.name === "Profile" ? (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            options={{ icon: tab.icon } as any}
          >
            {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
          </Tab.Screen>
        ) : (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{ icon: tab.icon } as any}
          />
        ),
      )}
    </Tab.Navigator>
  );
};
