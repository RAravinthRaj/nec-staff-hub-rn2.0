/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles as S } from "./styles";
import { useTheme } from "@rneui/themed";
import { Fonts, Images } from "@/assets";
import ElevatedView from "react-native-elevated-view";

export interface INoDataFound {
  title: string;
  buttonTitle: string;
  onPress: () => void;
}

export const NoDataFound = ({ title, buttonTitle, onPress }: INoDataFound) => {
  const { theme } = useTheme();

  const _renderImage = () => {
    return (
      <View style={StyleSheet.flatten([S.imageContainer])}>
        <Image
          source={Images.noData}
          style={StyleSheet.flatten([S.noDataImage])}
        />
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
          onPress={onPress}
        >
          <Text
            style={StyleSheet.flatten([
              S.buttonTitle,
              { color: theme.colors.white, fontFamily: Fonts.semibold },
            ])}
          >
            {buttonTitle}
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    );
  };

  return (
    <View style={StyleSheet.flatten([S.noDataContainer])}>
      {_renderImage()}
      <Text style={StyleSheet.flatten([S.noClass, { fontFamily: Fonts.bold }])}>
        {title}
      </Text>
      {_renderButton()}
    </View>
  );
};
