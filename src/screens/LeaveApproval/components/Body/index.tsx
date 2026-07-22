/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Fonts } from "@/assets";
import { LEAVE_APPROVAL_CONFIG } from "../../config";
import { LinearGradient } from "expo-linear-gradient";

export interface IBody {
  status: string;
  onStatusChange: (value: string) => void;
}

export const Body: React.FC<IBody> = ({ status, onStatusChange }) => {
  const { theme } = useTheme();

  const _renderScheduleHeader = () => {
    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        <Text
          style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
        >
          {LEAVE_APPROVAL_CONFIG.leaveRequests}
        </Text>
      </View>
    );
  };

  const _renderChip = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={StyleSheet.flatten([
          S.chipContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {LEAVE_APPROVAL_CONFIG.chips.map((chip, index) => {
          const isActive = status === chip;

          return (
            <TouchableOpacity
              key={chip}
              activeOpacity={0.8}
              onPress={() => onStatusChange(chip)}
            >
              {isActive ? (
                <LinearGradient
                  colors={["#01B5A7", "#0B62AA"] as const}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.flatten([S.chip])}
                >
                  <Text
                    style={StyleSheet.flatten([
                      S.text,
                      { color: theme.colors.white },
                      { fontFamily: Fonts.semibold },
                    ])}
                  >
                    {chip}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={StyleSheet.flatten([
                    S.chip,
                    { borderWidth: 0.5, borderColor: theme.colors.chipBorder },
                  ])}
                >
                  <Text style={StyleSheet.flatten([S.text])}>{chip}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderScheduleHeader()}
      {_renderChip()}
    </View>
  );
};
