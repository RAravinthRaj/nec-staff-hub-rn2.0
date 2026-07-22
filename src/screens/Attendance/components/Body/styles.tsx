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
  statisticsContainer: {
    paddingVertical: 10,
    gap: 12,
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
  textContainer: {
    display: "flex",
    flexDirection: "column",
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
  searchBarContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  searchBarElevatedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 0.5,
    width: ScreenWidth * 0.8,
    paddingVertical: 13,
    paddingHorizontal: 18,
    fontSize: 15,
    borderRadius: 12,
  },
  search: {
    borderRadius: "50%",
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
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  titleContainer: {
    width: ScreenWidth * 0.91,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1.5,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 1,
  },
  titleItem: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    fontFamily: Fonts.bold,
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
    display: "flex",
    flexDirection: "column",
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
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 16,
  },
});
