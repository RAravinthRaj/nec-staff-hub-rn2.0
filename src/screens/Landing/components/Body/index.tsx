/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Images, Fonts } from "@/assets";
import { styles as S } from "./styles";
import { LANDING_CONFIG } from "../../config";
import { useTheme } from "@rneui/themed";
import ElevatedView from "react-native-elevated-view";

export interface IBody {
  navigateToLogin: () => void;
}

export const Body = ({ navigateToLogin }: IBody) => {
  const { theme } = useTheme();

  const _renderLandingImage = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images.landing}
          style={StyleSheet.flatten([S.landingImage])}
        />
      </View>
    );
  };

  const _renderText = () => {
    return (
      <View>
        <View style={StyleSheet.flatten([S.textContainer])}>
          <Text
            style={StyleSheet.flatten([S.header, { fontFamily: Fonts.bold }])}
          >
            {LANDING_CONFIG.greet}
          </Text>
          <Text
            style={StyleSheet.flatten([
              S.header,
              { color: theme.colors.primary, fontFamily: Fonts.bold },
            ])}
          >
            {LANDING_CONFIG.appName}
          </Text>
        </View>
        <View style={StyleSheet.flatten([S.descriptionContainer])}>
          <Text
            style={StyleSheet.flatten([
              S.description,
              { fontFamily: Fonts.regular },
            ])}
          >
            {LANDING_CONFIG.description}
          </Text>
        </View>
      </View>
    );
  };

  const _renderButton = () => {
    return (
      <ElevatedView
        style={StyleSheet.flatten([S.buttonContainer])}
        elevation={5}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            S.button,
            {
              backgroundColor: theme.colors.primary,
            },
          ])}
          activeOpacity={0.8}
          onPress={navigateToLogin}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {LANDING_CONFIG.buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  return (
    <ScrollView
      style={StyleSheet.flatten([S.container])}
      showsVerticalScrollIndicator={false}
    >
      {_renderLandingImage()}
      {_renderText()}
      {_renderButton()}
    </ScrollView>
  );
};
