/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { StyleSheet } from "react-native";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
    lineHeight: 35,
  },
  modalSubTitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    minHeight: 80,
    textAlignVertical: "top",
    fontFamily: Fonts.regular,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});
