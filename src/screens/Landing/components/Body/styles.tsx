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
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  landingImage: {
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.33,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    marginBottom: 10,
  },
  header: {
    fontSize: 40,
    lineHeight: 50,
    letterSpacing: 0.4,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  description: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 25,
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
    width: ScreenWidth * 0.8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 19,
  },
});
