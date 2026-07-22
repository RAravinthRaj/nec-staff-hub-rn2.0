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
  accordionContainer: {
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 0.8,
    elevation: 2,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  arrowContainer: {
    position: "absolute",
    right: 10,
    marginHorizontal: 5,
  },
  cardContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  logoContainer: {
    borderRadius: 100,
    height: ScreenHeight * 0.055,
    width: ScreenWidth * 0.12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  logo: {
    fontSize: 30,
    fontFamily: Fonts.bold,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginHorizontal: 10,
  },
  subNameContainer: {
    display: "flex",
  },
  subName: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    width: ScreenWidth * 0.55,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
  },
  time: {
    fontSize: 12.5,
    fontFamily: Fonts.bold,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  badge: {
    fontSize: 10,
    fontFamily: Fonts.semibold,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    gap: 5,
  },
  bodyTitle: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
    marginHorizontal: 8,
  },
  yearMainContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  yearContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginHorizontal: 8,
  },
  yearSubContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  styledKey: {
    fontSize: 17,
    fontFamily: Fonts.semibold,
  },
  styledValue: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    display: "flex",
    alignSelf: "flex-end",
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: ScreenWidth * 0.3,
    paddingVertical: 9,
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 14,
  },
});
