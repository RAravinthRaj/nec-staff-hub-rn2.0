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
    paddingHorizontal: 5,
  },
  leaveContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 8,
    borderLeftWidth: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  text: {
    fontSize: 13.5,
    fontFamily: Fonts.regular,
  },
  mainStatusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 3,
    elevation: 5,
    alignSelf: "flex-end",
  },
  statusContainer: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  typeText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
  },
  dateText: {
    fontSize: 19,
    fontFamily: Fonts.bold,
  },
  description: {
    display: "flex",
    flexDirection: "column",
    width: ScreenWidth * 0.4,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
  monthText: {
    fontSize: 19,
    fontFamily: Fonts.semibold,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  mainLeaveContainer: {
    marginBottom: 12,
  },
});
