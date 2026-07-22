/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Text, View, StyleSheet } from "react-native";
import { styles as S } from "./styles";
import { CONFIG } from "@/config";
import { Fonts } from "@/assets";
import { useTheme } from "@rneui/themed";

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <View
      style={StyleSheet.flatten([
        S.container,
        { backgroundColor: theme.colors.white },
      ])}
    >
      <Text style={StyleSheet.flatten([S.text, { fontFamily: Fonts.regular }])}>
        {CONFIG.footer}
      </Text>
    </View>
  );
};
