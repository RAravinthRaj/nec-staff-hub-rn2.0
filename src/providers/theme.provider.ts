/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Lotties } from "@/assets";
import { createTheme } from "@rneui/themed";

const lightColors = {
  primary: "#2640C2",
  secondary: "#207CC9",
  tertiary: "#A0C4FF",
  background: "#e2e2e2",
  white: "#ffffff",
  black: "#000000",
  red: "#EA0000",
  orange: "#FF6F00",
  green: "#39FF14",
  secondaryBackground: "#FAFAFC",
  border: "#A8A8A8",
  badgeGreen: "#008000",
  tertiaryBackground: "#F5F8FE",
  badgeGreenBackground: "#B3F6D0",
  orangeBackground: "#FFD4B2",
  redBackground: "#FFAE9E",
  chipBorder: "#01B5A7",
};

const darkColors = {
  primary: "#2640C2",
  secondary: "#207CC9",
  tertiary: "#A0C4FF",
  background: "#121212",
  white: "#ffffff",
  black: "#000000",
  red: "#EA0000",
  orange: "#FF6F00",
  green: "#39FF14",
  secondaryBackground: "#FAFAFC",
  border: "#A8A8A8",
  tertiaryBackground: "#F5F8FE",
  greenBackground: "#B3F6D0",
  orangeBackground: "#FFD4B2",
  redBackground: "#FFAE9E",
  chipBorder: "#01B5A7",
};

type ThemeMode = "light" | "dark";

export const buildTheme = (mode: ThemeMode) => {
  const colors = mode === "dark" ? darkColors : lightColors;

  const theme = createTheme({
    lightColors: colors,
    darkColors: colors,
  });

  return {
    ...theme,
    colors,
    lotties: Lotties,
  };
};
