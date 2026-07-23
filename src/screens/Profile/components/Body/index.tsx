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
  const [imageError, setImageError] = useState(false);

  const photoUri = data?.profilePhoto || data?.profile_image;
  const hasCustomPhoto = photoUri && typeof photoUri === "string" && photoUri.length > 0 && !imageError;

  const _renderLogo = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={hasCustomPhoto ? { uri: photoUri } : Images.profile}
          onError={() => setImageError(true)}
          style={StyleSheet.flatten([S.profileImage])}
        />
      </View>
    );
  };

  const _renderName = () => {
    const prefix = data?.gender === "Female" ? "Ms." : data?.gender === "Male" ? "Mr." : "";
    const displayName = prefix ? `${prefix} ${data?.name || ""}` : data?.name || "Staff Member";

    let designationStr = data?.designation || "Assistant Professor";
    if (designationStr.includes(",")) {
      designationStr = designationStr.split(",")[0].trim();
    }

    return (
      <View style={StyleSheet.flatten([S.textContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.nameText,
            { color: theme.colors.primary },
          ])}
        >
          {displayName}
        </Text>
        <Text style={StyleSheet.flatten([S.designationText])}>
          {designationStr}
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
