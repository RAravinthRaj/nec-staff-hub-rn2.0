/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

export const styles = StyleSheet.create({
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noDataImage: {
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.34,
  },
  noClass: {
    fontSize: 25,
    margin: 10,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 14,
    borderRadius: 12,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: ScreenWidth * 0.4,
    paddingVertical: 13,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 18,
  },
});
