/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useThemeMode } from "@/hooks";
import { useAuthStore } from "@/store/useAuthStore";

import {
  LandingScreen,
  LoginScreen,
  OtpScreen,
  AttendanceScreen,
  NotificationScreen,
  OAFilterScreen,
} from "@/screens";

import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { theme } = useThemeMode();
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp">
              {(props) => (
                <OtpScreen
                  {...props}
                  onLoginSuccess={() => {}}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs">
              {(props) => (
                <TabNavigator
                  {...props}
                  onLogout={logout}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="OAFilter" component={OAFilterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
