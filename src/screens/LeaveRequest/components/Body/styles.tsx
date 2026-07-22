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
  headerContainer: {
    padding: 20,
    gap: 25,
  },
  typeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
  },
  typeSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  radioButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
    lineHeight: 22,
  },
  typeText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    marginTop: -12,
  },
  date: {
    width: ScreenWidth * 0.5,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
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
  textareaContainer: {
    height: ScreenHeight * 0.17,
    padding: 2,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  textarea: {
    height: ScreenHeight * 0.17,
    textAlignVertical: "top",
    fontSize: 16,
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
});
