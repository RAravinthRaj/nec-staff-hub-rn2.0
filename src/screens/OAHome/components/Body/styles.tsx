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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerContainer: {
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  categoryContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginVertical: 6,
  },
  field: {
    flex: 1,
  },
  fullWidthField: {
    width: "100%",
  },
  typeText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  dateField: {
    flex: 1,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    lineHeight: 22,
  },
  searchBarContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    gap: 12,
  },
  searchBarElevatedContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 0.5,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 18,
    paddingRight: 40,
    fontSize: 15,
    borderRadius: 12,
  },
  statsHeaderContainer: {
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    height: ScreenHeight * 0.04,
    width: ScreenWidth * 0.08,
  },
  card: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
  },
  detail: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  description: {
    fontSize: 13,
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  statCard: {
    width: ScreenWidth * 0.42,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  statValue: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 6,
  },
  actionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1.5,
    marginTop: 18,
    zIndex: 1,
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
  },
  titleHeaderText: {
    fontSize: 15,
    color: "white",
    fontFamily: Fonts.semibold,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    textAlign: "center",
  },
  primaryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  odButton: {
    marginTop: 14,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomTextContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 25,
    fontFamily: Fonts.bold,
  },
  bottomSubText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    textAlign: "center",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  paginationRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  paginationButtons: {
    flexDirection: "row",
    gap: 10,
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
  paginationButtonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
