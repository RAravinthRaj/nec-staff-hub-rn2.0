/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { FontFamily, ImagesCache, LottiesCache } from "@/assets";
import { useThemeMode } from "@/hooks";
import { ThemeProvider } from "@rneui/themed";
import { cacheFonts, cacheImages } from "@/utils";
import { AppNavigator } from "@/navigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toast";

SplashScreen.preventAutoHideAsync();

export const Main = () => {
  const { theme } = useThemeMode();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const _loadResources = async () => {
      try {
        await Promise.all([
          cacheFonts(FontFamily),
          ...cacheImages(ImagesCache),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    _loadResources();
  }, []);

  if (!appIsReady) {
    return (
      <View style={StyleSheet.flatten([styles.container])}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
      <Toast config={toastConfig} position="top" topOffset={60} />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
