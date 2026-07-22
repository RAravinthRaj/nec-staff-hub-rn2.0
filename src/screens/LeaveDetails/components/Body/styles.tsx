/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { Fonts } from "@/assets";
import { ScreenWidth } from "@rneui/base";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 5,
  },
  headerContainer: {
    width: "100%",
    paddingTop: 25,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginHorizontal: 8,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  keyText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  valueText: {
    fontSize: 17,
    fontFamily: Fonts.semibold,
    lineHeight: 24,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 5,
    marginBottom: -10,
  },
  statusText: {
    fontSize: 16,
  },
  reasonContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: "relative",
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
    marginBottom: 13,
  },
});
