/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { ScreenHeight } from "@rneui/base";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: ScreenHeight * 0.08,
  },
  mainTitleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderWidth: 0.2,
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  summaryText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 16,
  },
  lastStyle: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  radioButton: {
    marginHorizontal: 1,
  },
  statusColumn: {
    justifyContent: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
  },
});
