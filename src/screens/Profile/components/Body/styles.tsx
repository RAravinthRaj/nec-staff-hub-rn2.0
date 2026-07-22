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
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: ScreenWidth * 0.235,
    height: ScreenHeight * 0.11,
    margin: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  nameText: {
    fontFamily: Fonts.semibold,
    fontSize: ScreenWidth * 0.07,
    lineHeight: 40,
  },
  designationText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
