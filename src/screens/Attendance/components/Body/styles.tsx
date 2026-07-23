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
  },
  statsGridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    paddingTop: 14,
    justifyContent: "space-between",
  },
  card: {
    width: (ScreenWidth - 40) / 2,
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    height: 38,
    width: 38,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
  },
  detail: {
    fontSize: 26,
    lineHeight: 30,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
    color: "#FFFFFF",
    marginTop: 1,
  },
  searchBarContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginVertical: 6,
  },
  searchBarElevatedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 0,
    width: ScreenWidth * 0.76,
    paddingVertical: 13,
    paddingHorizontal: 18,
    fontSize: 15,
    borderRadius: 12,
  },
  search: {
    borderRadius: 20,
    padding: 5,
  },
  icons: {
    position: "absolute",
    right: 3,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalStyle: {
    position: "absolute",
    top: ScreenHeight * 0.35,
    right: ScreenWidth * 0.05,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    pointerEvents: "box-none",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    fontFamily: Fonts.regular,
  },
  text: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  button: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
  },
  sheet: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 20,
  },
  bottomTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  bottomText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  bottomSubText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
