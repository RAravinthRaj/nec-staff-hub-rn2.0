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
    paddingVertical: 10,
    gap: 10,
    marginVertical: 10,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  header: {
    fontSize: 23,
  },
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginHorizontal: 15,
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
