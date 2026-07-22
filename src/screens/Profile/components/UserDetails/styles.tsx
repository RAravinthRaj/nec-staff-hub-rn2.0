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
    marginBottom: ScreenHeight * 0.1,
  },
  headerContainer: {
    width: "100%",
    padding: 10,
    gap: 15,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
  },
  titleText: {
    fontFamily: Fonts.semibold,
    fontSize: 22,
  },
  designationText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  dataContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 5,
    padding: 0.2,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  dataText: {
    fontSize: 16.5,
    fontFamily: Fonts.regular,
  },
  detailContainer: {
    marginHorizontal: 10,
  },
  switchContainer: {
    height: ScreenHeight * 0.033,
    alignItems: "center",
    justifyContent: "center",
  },
  switchWrapper: {
    padding: 8,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 12,
  },
  bottomTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 25,
    fontFamily: Fonts.bold,
  },
  bottomSubText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: ScreenWidth * 0.08,
    borderRadius: 8,
  },
});
