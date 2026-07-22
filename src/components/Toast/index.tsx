/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";

export const CustomToast = ({ text1, props }: BaseToastProps) => {
  const { theme } = useTheme();
  const type = props?.type || "error";

  const config = {
    success: {
      icon: "checkmark",
      color: theme.colors.badgeGreen,
      backgroundColor: theme.colors.badgeGreenBackground,
    },
    error: {
      icon: "close",
      color: theme.colors.red,
      backgroundColor: theme.colors.redBackground,
    },
    warning: {
      icon: "warning",
      color: theme.colors.orange,
      backgroundColor: theme.colors.orangeBackground,
    },
    info: {
      icon: "information",
      color: theme.colors.secondary,
      backgroundColor: theme.colors.secondaryBackground,
    },
  };

  const selected = config[type as keyof typeof config];

  return (
    <View
      style={[
        S.container,
        {
          backgroundColor: selected?.backgroundColor,
          borderColor: selected?.color,
        },
      ]}
    >
      <View style={[S.iconContainer, { backgroundColor: selected?.color }]}>
        <Ionicons name={selected.icon as any} size={20} color="#FFFFFF" />
      </View>

      <Text style={[S.text, { color: selected?.color }]}>{text1}</Text>

      <TouchableOpacity onPress={() => Toast.hide()}>
        <Ionicons name="close" size={24} color={selected?.color} />
      </TouchableOpacity>
    </View>
  );
};
