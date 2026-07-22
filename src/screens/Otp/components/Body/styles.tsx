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
    marginBottom: 20,
  },
  otpImage: {
    width: ScreenWidth * 0.7,
    height: ScreenHeight * 0.3,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    marginVertical: 5,
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
    gap: 2,
    margin: 10,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 23,
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
  otpMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 15,
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: ScreenWidth * 0.8,
    gap: 20,
  },
  otpInput: {
    height: ScreenHeight * 0.07,
    width: ScreenWidth * 0.15,
    borderWidth: 1.5,
  },
  resendContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 5,
    marginVertical: 10,
  },
  resend: {
    fontSize: 16,
  },
});
