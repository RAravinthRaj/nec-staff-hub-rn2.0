/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { STAFF_TAB_CONFIG, HOD_TAB_CONFIG } from "@/config/tab.config";
import { CustomTabBar } from "../CustomTabBar";
import { ProfileScreen } from "@/screens";
import { useAuthStore } from "@/store/useAuthStore";

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ onLogout }: { onLogout?: () => void }) => {
  const user = useAuthStore((state) => state.user);
  const tabConfig = user?.role === "HOD" ? HOD_TAB_CONFIG : STAFF_TAB_CONFIG;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
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
