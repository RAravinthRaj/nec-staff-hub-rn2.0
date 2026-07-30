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
import { ATTENDANCE_CONFIG } from "../../config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ElevatedView from "react-native-elevated-view";
import { useNavigation } from "@react-navigation/native";

export interface IHeader {
  goBack?: () => void;
  onSave?: () => void;
}

export const Header = ({ goBack, onSave }: IHeader) => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleGoBack = () => {
    if (goBack) {
      goBack();
    } else if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

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

  const _renderButton = () => (
    <ElevatedView style={S.buttonContainer} elevation={5}>
      <TouchableOpacity
        style={[S.button, { backgroundColor: theme.colors.white }]}
        activeOpacity={0.8}
        onPress={onSave}
      >
        <Text
          style={[
            S.buttonTitle,
            { color: theme.colors.primary, fontFamily: Fonts.semibold },
          ]}
        >
          {ATTENDANCE_CONFIG.saveButton}
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
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ left: 30, right: 30, top: 20, bottom: 20 }} onPress={handleGoBack}>
              <FontAwesome6
                name="arrow-left-long"
                size={25}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={StyleSheet.flatten([
                S.title,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {ATTENDANCE_CONFIG.attendance}
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
