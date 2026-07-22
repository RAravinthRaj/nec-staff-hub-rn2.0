/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { Images } from "@/assets";

export interface IBody {
  data: any;
}

export const Body = ({ data }: IBody) => {
  const { theme } = useTheme();

  const _renderLogo = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images.profile}
          style={StyleSheet.flatten([S.profileImage])}
        />
      </View>
    );
  };

  const _renderName = () => {
    return (
      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.nameText,
            { color: theme.colors.primary },
          ])}
        >
          {data?.gender === "Male" ? "Mr." : "Ms."} {data?.name}
        </Text>
        <Text style={StyleSheet.flatten([S.designationText])}>
          {data?.designation}
        </Text>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.white },
        ])}
      >
        {_renderLogo()}
        {_renderName()}
      </View>
    );
  };

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      {_renderHeader()}
    </View>
  );
};
