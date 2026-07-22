/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { StyleSheet } from "react-native";

const H_PADDING = 12;
const ITEM_MARGIN = 6;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingHorizontal: H_PADDING,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedPill: {
    position: "absolute",
    borderRadius: 24,
    left: H_PADDING + ITEM_MARGIN,
  },
  tabItem: {
    flex: 1,
    height: "100%",
    marginHorizontal: ITEM_MARGIN,
    alignItems: "center",
    justifyContent: "center",
  },
});
