/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Text, StyleSheet, View } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { Fonts } from "@/assets";
import { PROFILE_CONFIG } from "../../config";

export interface IHeader {}

export const Header = () => {
  const { theme } = useTheme();

  const _renderDesign = () => {
    return (
      <View style={StyleSheet.flatten([S.designContainer])}>
        <View
          style={StyleSheet.flatten([
            S.design,
            { backgroundColor: theme.colors.border },
          ])}
        />
        <View
          style={StyleSheet.flatten([
            S.design,
            { backgroundColor: theme.colors.border, left: -60 },
          ])}
        />
      </View>
    );
  };

  const _renderHeaderTitle = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.primary },
        ])}
      >
        <View style={StyleSheet.flatten([S.textContainer])}>
          <View style={StyleSheet.flatten([S.titleContainer])}>
            <Text
              style={StyleSheet.flatten([
                S.title,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {PROFILE_CONFIG.profile}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View>
        {_renderHeaderTitle()}
        <View style={StyleSheet.flatten([S.designMainContainer])}>
          {_renderDesign()}
        </View>
      </View>
    );
  };

  return (
    <View style={StyleSheet.flatten([S.container])}>{_renderHeader()}</View>
  );
};
