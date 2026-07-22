/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { View, StyleSheet } from "react-native";
import { styles as S } from "./styles";
import React, { useState, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useThemeMode } from "@/hooks";
import { StatusBar } from "expo-status-bar";

export interface IPageContainer {
  isLightStatusBar: boolean;
  children: any;
}

export const PageContainer = ({
  isLightStatusBar,
  children,
}: IPageContainer) => {
  const { theme } = useThemeMode();
  const [flexToggle, setFlexToggle] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setFlexToggle(false);
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setFlexToggle(true);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={isLightStatusBar ? "light" : "dark"} />
      <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            style={{ flex: 1 }}
          >
            {children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};
