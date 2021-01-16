import React, { useState, useEffect } from "react";
import { Themes } from "./Theme";

const initialState = {
  dark: false,
  theme: Themes.light,
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [dark, setTheme] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setTheme(isDark);
  }, [dark]);

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setTheme(isDark);
  };
  const bodyTheme = dark ? Themes.dark : Themes.light;

  return (
    <ThemeContext.Provider value={{ bodyTheme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export  {ThemeProvider, ThemeContext};
