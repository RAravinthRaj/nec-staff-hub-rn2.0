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
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  scheduleContainer: {
    width: "100%",
    marginVertical: 8,
  },
  header: {
    fontSize: 23,
    marginHorizontal: 15,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  day: {
    fontSize: 25,
    lineHeight: 40,
  },
  date: {
    fontSize: 15,
    letterSpacing: 0.4,
    opacity: 0.5,
  },
  weekContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    marginBottom: 10,
  },
  weekCard: {
    width: ScreenWidth * 0.135,
    height: ScreenHeight * 0.07,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: ScreenWidth * 0.025,
    borderWidth: 0.1,
    elevation: 3,
  },
  weekDay: {
    fontSize: 12,
  },
  weekDate: {
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  dialogCard: {
    width: ScreenWidth * 0.9,
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dialogHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  dialogTitle: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
    fontWeight: "600",
  },
});
