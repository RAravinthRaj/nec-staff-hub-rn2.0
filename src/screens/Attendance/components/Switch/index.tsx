/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { styles as S } from "./styles";
import { ATTENDANCE_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";

export interface ICustomSwitch {
  status: "present" | "absent" | "od";
  onChange?: (status: "present" | "absent") => void;
}

export const CustomSwitch = ({ status, onChange }: ICustomSwitch) => {
  const [changeStatus, setChangeStatus] = useState(status);
  const { theme } = useTheme();

  useEffect(() => {
    setChangeStatus(status);
  }, [status]);

  const _toggleStatus = () => {
    if (changeStatus === "od") return;

    const newStatus = changeStatus === "present" ? "absent" : "present";

    setChangeStatus(newStatus);

    if (onChange) {
      onChange(newStatus);
    }
  };

  const currentColor = (theme.colors as any)[ATTENDANCE_CONFIG.color[changeStatus]] || theme.colors.primary;

  return (
    <TouchableOpacity
      onPress={_toggleStatus}
      activeOpacity={0.7}
      style={StyleSheet.flatten([
        S.container,
        {
          borderColor: currentColor,
          flexDirection: changeStatus === "present" ? "row-reverse" : "row",
        },
      ])}
    >
      <View
        style={StyleSheet.flatten([
          S.dot,
          {
            backgroundColor: currentColor,
          },
        ])}
      />

      <Text
        style={StyleSheet.flatten([
          S.text,
          {
            color: currentColor,
          },
        ])}
      >
        {changeStatus === "od" ? "on-duty" : changeStatus}
      </Text>
    </TouchableOpacity>
  );
};
