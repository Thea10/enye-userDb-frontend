import React, { useState, useContext } from "react";
import { ThemeContext } from "./Theme/ThemeProvider";
import Search from "./components/Search/Search";
import Users from "./components/Users/Users";
import SwitchTheme from "./ThemeToggler/Button/SwitchTheme";

const Main = () => {
  const [switched, toggleSwitch] = useState(true);
  const { bodyTheme, toggle } = useContext(ThemeContext);

  return (
    <div
      className="main-holder"
      style={{
        backgroundColor: bodyTheme.background,
      }}
    >
      <SwitchTheme
        color={bodyTheme.togglerColor}
        switchTheme={toggle}
        checked={switched}
        toggleCheck={() => toggleSwitch(!switched)}
      />

      <div className="views-holder">
        <Users />
        <Search />
      </div>
    </div>
  );
};

export default Main;
