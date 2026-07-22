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
    zIndex: 1,
  },
  designMainContainer: {
    position: "absolute",
    top: -ScreenHeight * 0.13,
    left: -ScreenWidth * 0.27,
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
    height: ScreenHeight * 0.13,
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    letterSpacing: 0.4,
  },
  buttonContainer: {
    display: "flex",
    alignSelf: "flex-end",
    borderRadius: 12,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: ScreenWidth * 0.2,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 15,
  },
});
