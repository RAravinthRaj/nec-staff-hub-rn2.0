/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  designMainContainer: {
    position: "absolute",
    top: -ScreenHeight * 0.13,
    left: -ScreenWidth * 0.27,
    zIndex: 2,
    pointerEvents: "none",
  },
  designContainer: {
    flexDirection: "row",
    transform: [{ rotate: "-28deg" }],
  },
  design: {
    width: ScreenWidth * 0.45,
    height: ScreenWidth * 0.45,
    borderRadius: (ScreenWidth * 0.45) / 2,
    opacity: 0.1,
  },
  headerContainer: {
    height: ScreenHeight * 0.17,
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 0,
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greet: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 25,
  },
  userName: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    margin: 10,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 23,
  },
  bellIcon: {
    marginRight: 5,
  },
  badgeContainer: {
    position: "relative",
    zIndex: 3,
  },
  badge: {
    position: "absolute",
    top: -1,
    right: 1,
    borderWidth: 1,
  },
});
