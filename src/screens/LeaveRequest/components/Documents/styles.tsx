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
  container: {
    width: "100%",
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 19,
    fontFamily: Fonts.semibold,
    lineHeight: 22,
  },
  typeText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    lineHeight: 22,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 40,
    borderRadius: 12,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: ScreenWidth * 0.9,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 19,
  },
  documentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: ScreenWidth * 0.18,
    paddingVertical: 4,
    borderRadius: 5,
    gap: 5,
  },
  addButtonTitle: {
    fontSize: 12,
  },
  documentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop: 12,
  },
  documentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  documentName: {
    flex: 1,
  },
  valueName: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
});
