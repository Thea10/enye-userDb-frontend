import React, { useState, useEffect } from "react";
import { Themes } from "./Theme";

const initialState = {
  light: false,
  theme: Themes.dark,
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [light, setTheme] = useState(false);

  useEffect(() => {
    const isLight = localStorage.getItem("light") === "true";
    setTheme(isLight);
  }, [light]);

  const toggle = () => {
    const isLight = !light;
    localStorage.setItem("light", JSON.stringify(isLight));
    setTheme(isLight);
  };
  const bodyTheme = light ? Themes.light : Themes.dark;

  return (
    <ThemeContext.Provider value={{ bodyTheme, light, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export  {ThemeProvider, ThemeContext};
