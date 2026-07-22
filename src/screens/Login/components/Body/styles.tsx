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
    marginBottom: 20,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  loginImage: {
    width: ScreenWidth * 0.7,
    height: ScreenHeight * 0.3,
    marginTop: -10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  header: {
    fontSize: 33,
    lineHeight: 40,
    letterSpacing: 0.4,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    margin: 5,
  },
  description: {
    textAlign: "center",
    fontSize: 17,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 12,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: ScreenWidth * 0.8,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  buttonTitle: {
    fontSize: 19,
  },
  formContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    marginHorizontal: 50,
    gap: 5,
  },
  input: {
    borderWidth: 0.05,
    width: ScreenWidth * 0.8,
    paddingVertical: 18,
    paddingHorizontal: 18,
    fontSize: 18,
    borderRadius: 12,
  },
  label: {
    position: "absolute",
    top: -14,
    left: 12,
    fontSize: 17,
    padding: 3,
  },
  labelContainer: {
    position: "absolute",
    top: -14,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 3,
    zIndex: 10,
    opacity: 0.6,
    borderRadius: 10,
  },
  labelText: {
    fontSize: 14,
  },
  googleImage: {
    width: 18,
    height: 18,
  },
  separator: {
    fontSize: 18,
    opacity: 0.8,
  },
});
