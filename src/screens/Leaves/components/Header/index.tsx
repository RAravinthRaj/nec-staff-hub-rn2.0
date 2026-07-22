/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { Fonts } from "@/assets";
import { LEAVE_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";

export interface IHeader {
  navigateToNewLeave: () => void;
}

export const Header = ({ navigateToNewLeave }: IHeader) => {
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

  const _renderButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={5}>
      <TouchableOpacity
        style={[S.button, { backgroundColor: theme.colors.white }]}
        activeOpacity={0.8}
        onPress={navigateToNewLeave}
      >
        <Text
          style={[
            S.buttonTitle,
            { color: theme.colors.primary, fontFamily: Fonts.semibold },
          ]}
        >
          {LEAVE_CONFIG.newButton}
        </Text>
      </TouchableOpacity>
    </ElevatedView>
  );

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
              {LEAVE_CONFIG.leaves}
            </Text>
          </View>
        </View>
        {_renderButton()}
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
