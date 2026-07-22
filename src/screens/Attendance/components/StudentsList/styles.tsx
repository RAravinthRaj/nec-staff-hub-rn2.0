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
  mainTitleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  titleContainer: {
    width: ScreenWidth * 0.91,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderWidth: 0.2,
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    textAlign: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  lastStyle: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
