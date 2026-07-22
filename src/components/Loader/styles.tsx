/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Fonts } from "@/assets";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullLottie: {
    width: 60,
    height: 60,
  },

  modalContainer: {
    width: width * 0.7,
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },

  modalLottie: {
    width: 60,
    height: 60,
  },

  loadingText: {
    marginTop: 14,
    fontSize: 16,
    fontFamily: Fonts.regular,
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 25,
  },
});
