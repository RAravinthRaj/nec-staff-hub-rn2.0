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
  image: {
    height: ScreenHeight * 0.062,
    width: ScreenWidth * 0.133,
    marginRight: 15,
  },
  leaveContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 8,
    borderLeftWidth: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    elevation: 2,
    gap: 5,
  },
  subLeaveContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  userDataLeaveContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userSubDataLeaveContainer: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 13.5,
    fontFamily: Fonts.regular,
  },
  byTextContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  byText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  byDescriptionContainer: {
    fontSize: 14,
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
    margin: 5,
  },
  statusContainer: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 2,
  },
  typeText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
  },
  dateText: {
    fontSize: 17,
    fontFamily: Fonts.bold,
  },
  description: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: ScreenWidth * 0.4,
  },
  dataDescription: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    marginLeft: -5,
  },
  descriptionText: {
    flexShrink: 1,
    flexWrap: "wrap",
    includeFontPadding: false,
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
