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
import { LEAVE_APPROVAL_CONFIG } from "../../config";
import Octicons from "@expo/vector-icons/Octicons";
import { Badge } from "react-native-paper";
import { useState } from "react";

export interface IHeader {
  navigateToNotification: () => void;
}

export const Header = ({ navigateToNotification }: IHeader) => {
  const { theme } = useTheme();
  const [showBadge, setShowBadge] = useState(true);

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

  const _renderUserDetails = () => {
    return (
      <View
        style={StyleSheet.flatten([
          S.headerContainer,
          { backgroundColor: theme.colors.primary },
        ])}
      >
        <View style={StyleSheet.flatten([S.textContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.greet,
              { fontFamily: Fonts.regular, color: theme.colors.white },
            ])}
          >
            {LEAVE_APPROVAL_CONFIG.greet}
          </Text>
          <View style={StyleSheet.flatten([S.userNameContainer])}>
            <Text
              style={StyleSheet.flatten([
                S.userName,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {LEAVE_APPROVAL_CONFIG.userName}
            </Text>
            <Text style={StyleSheet.flatten([S.userName])}>
              {LEAVE_APPROVAL_CONFIG.waveSign}
            </Text>
          </View>
        </View>
        {_renderNotification()}
      </View>
    );
  };

  const _renderNotification = () => {
    return (
      <View style={StyleSheet.flatten([S.bellIcon])}>
        <TouchableOpacity
          style={StyleSheet.flatten([S.badgeContainer])}
          onPress={navigateToNotification}
          hitSlop={30}
          activeOpacity={0.8}
        >
          <Octicons name="bell" size={24} color="white" />
          {showBadge && (
            <Badge
              size={10}
              style={StyleSheet.flatten([
                S.badge,
                { borderColor: theme.colors.white },
              ])}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View>
        {_renderUserDetails()}
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
