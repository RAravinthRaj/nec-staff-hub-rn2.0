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
import { OA_HOME_CONFIG } from "../../config";
import Octicons from "@expo/vector-icons/Octicons";
import { Badge } from "react-native-paper";

export interface IHeader {
  navigateToNotification: () => void;
  showBadge: boolean;
}

export const Header = ({ navigateToNotification, showBadge }: IHeader) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;

  const renderNotification = () => (
    <View style={StyleSheet.flatten([S.bellIcon])}>
      <TouchableOpacity
        style={StyleSheet.flatten([S.badgeContainer])}
        onPress={navigateToNotification}
        hitSlop={30}
        activeOpacity={0.8}
      >
        <Octicons name="bell" size={24} color={theme.colors.white} />
        {showBadge ? (
          <Badge
            size={10}
            style={StyleSheet.flatten([S.badge, { borderColor: theme.colors.white }])}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );

  const renderGreeting = () => (
    <View style={StyleSheet.flatten([S.textContainer])}>
      <Text
        style={StyleSheet.flatten([
          S.greet,
          { fontFamily: Fonts.regular, color: theme.colors.white },
        ])}
      >
        {OA_HOME_CONFIG.greet}
      </Text>
      <View style={StyleSheet.flatten([S.userNameContainer])}>
        <Text
          style={StyleSheet.flatten([
            S.userName,
            { color: theme.colors.white, fontFamily: Fonts.semibold },
          ])}
        >
          {OA_HOME_CONFIG.userName}
        </Text>
        <Text style={StyleSheet.flatten([S.userName])}>
          {OA_HOME_CONFIG.waveSign}
        </Text>
      </View>
    </View>
  );

  const renderUserDetails = () => (
    <View
      style={StyleSheet.flatten([
        S.headerContainer,
        { backgroundColor: theme.colors.primary },
      ])}
    >
      {renderGreeting()}
      {renderNotification()}
    </View>
  );

  const renderDecorations = () => (
    <View style={StyleSheet.flatten([S.designContainer])}>
      <View
        style={StyleSheet.flatten([S.design, { backgroundColor: colors.border }])}
      />
      <View
        style={StyleSheet.flatten([
          S.design,
          { backgroundColor: colors.border, left: -60 },
        ])}
      />
    </View>
  );

  return (
    <View style={StyleSheet.flatten([S.container])}>
      {renderUserDetails()}
      <View style={StyleSheet.flatten([S.designMainContainer])}>
        {renderDecorations()}
      </View>
    </View>
  );
};
