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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";

import { NOTIFICATION_CONFIG } from "../../config";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@/assets";

export interface IChip {
  category: string;
  onChange: (category: string) => void;
}

export const Chip = ({ category, onChange }: IChip) => {
  const { theme } = useTheme();

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
        {NOTIFICATION_CONFIG.chips.map((chip, index) => {
          const isActive = category === chip;

          return (
            <TouchableOpacity
              key={chip}
              activeOpacity={0.8}
              onPress={() => onChange(chip)}
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
        S.headerContainer,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderChip()}
    </View>
  );
};
