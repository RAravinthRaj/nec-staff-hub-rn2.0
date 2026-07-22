/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { StyleSheet } from "react-native";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  container: {
    width: "92%",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  iconContainer: {
    marginRight: 14,
    padding: 4,
    borderRadius: "50%",
  },

  text: {
    flex: 1,
    fontSize: 17,
    fontFamily: Fonts.semibold,
    color: "#FFFFFF",
  },
});
