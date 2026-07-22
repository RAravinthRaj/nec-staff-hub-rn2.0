/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Images } from "@/assets";
import { Image, View, StyleSheet } from "react-native";
import { styles as S } from "./styles";

export const LogoHeader = () => {
  return (
    <View style={StyleSheet.flatten([S.container])}>
      <Image source={Images.logo} style={StyleSheet.flatten([S.logo])} />
    </View>
  );
};
