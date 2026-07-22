/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { useState, useMemo, createContext, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { buildTheme } from "@/providers";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  theme: ReturnType<typeof buildTheme>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("light");

  // useEffect(() => {
  //   if (systemColorScheme) {
  //     setMode(systemColorScheme);
  //   }
  // }, [systemColorScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within CustomThemeProvider");
  }

  return context;
};
