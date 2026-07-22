/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { Fonts } from "@/assets";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 5,
  },
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    margin: 10,
  },
  chip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 5,
    borderRadius: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
