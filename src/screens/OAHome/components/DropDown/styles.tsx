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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11.5,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: ScreenWidth * 0.42,
  },
  anchor: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 12,
  },
  anchorText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    borderRadius: 6,
    maxHeight: 250,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  item: {
    padding: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
});
