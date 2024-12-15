import { Theme, ThemeContext } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);

    const classDark = ["bg-darkBg", "text-darkText", "border-darkBorder"];
    const classLight = ["bg-bg", "text-text", "border-border"];

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      // root.classList.add(...(systemTheme === "dark" ? classDark : classLight));
      if (systemTheme === "dark") {
        root.classList.remove(...classLight);
        root.classList.add(...classDark);
      } else {
        root.classList.remove(...classDark);
        root.classList.add(...classLight);
      }
      return;
    }

    if (theme === "dark") {
      root.classList.remove(...classLight);
      root.classList.add(...classDark);
    } else {
      root.classList.remove(...classDark);
      root.classList.add(...classLight);
    }
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
