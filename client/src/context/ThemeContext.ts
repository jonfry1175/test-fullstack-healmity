import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const initialThemeState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeContext =
  createContext<ThemeProviderState>(initialThemeState);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  const { theme, setTheme } = context;

  return { theme, setTheme };
};
