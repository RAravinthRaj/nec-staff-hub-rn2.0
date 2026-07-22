/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";

const TAB_BAR_HEIGHT = 72;
const H_PADDING = 12;
const ITEM_MARGIN = 6;
const PILL_HEIGHT = 35;

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const TAB_WIDTH = (width - H_PADDING * 2) / state.routes.length;
  const animatedIndex = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(animatedIndex, {
      toValue: state.index,
      stiffness: 300,
      damping: 18,
      mass: 0.7,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  const translateX = animatedIndex.interpolate({
    inputRange: state.routes.map((_, i) => i),
    outputRange: state.routes.map((_, i) => i * TAB_WIDTH),
  });

  return (
    <View
      style={[
        S.container,
        {
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Animated.View
        style={[
          S.animatedPill,
          {
            width: TAB_WIDTH - ITEM_MARGIN * 2,
            height: PILL_HEIGHT,
            top: (TAB_BAR_HEIGHT - PILL_HEIGHT) / 2,
            transform: [{ translateX }],
            backgroundColor: theme.colors.primary,
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const icon = (options as any).icon;
        const isFocused = state.index === index;
        const iconConfig = isFocused ? icon.focused : icon.unfocused;

        const color = isFocused ? theme.colors.white : theme.colors.black;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={S.tabItem}
            activeOpacity={0.85}
          >
            <Icon
              name={iconConfig.name}
              type={iconConfig.type}
              size={22}
              color={color}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
