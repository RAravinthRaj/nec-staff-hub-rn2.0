/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 2,
    gap: 3,
  },
  dot: {
    display: "flex",
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.semibold,
  },
});
