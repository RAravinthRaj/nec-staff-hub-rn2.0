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
import { LEAVE_APPROVAL_DETAIL_CONFIG } from "../../config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export interface IHeader {
  goBack: () => void;
}

export const Header = ({ goBack }: IHeader) => {
  const { theme } = useTheme();

  const _renderDesign = () => {
    return (
      <View style={StyleSheet.flatten([S.designContainer])}>
        <View
          style={StyleSheet.flatten([
            S.design,
            { backgroundColor: theme.colors.border },
          ])}
        ></View>
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
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={40}
              onPress={() => {
                goBack();
              }}
            >
              <FontAwesome6 name="arrow-left-long" size={25} color="white" />
            </TouchableOpacity>

            <Text
              style={StyleSheet.flatten([
                S.title,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {LEAVE_APPROVAL_DETAIL_CONFIG.leaves}
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
