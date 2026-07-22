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
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  headerContainer: {
    borderRadius: 10,
    borderWidth: 0.2,
  },
  notificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 12,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  notificationDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: ScreenWidth * 0.8,
    flexShrink: 1,
  },
  textContainer: {
    flexShrink: 1,
    width: ScreenWidth * 0.85,
    padding: 2,
  },
  titleText: {
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: 16,
    fontFamily: Fonts.semibold,
    lineHeight: 25,
  },
  messageText: {
    flexWrap: "wrap",
    flexShrink: 1,
  },
  dateText: {
    margin: 8,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.regular,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.regular,
  },
  modalButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
});
