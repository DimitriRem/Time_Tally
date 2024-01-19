import { useContext, useMemo, useState } from "react";
import DataContext from "./context/DataContext";
import Logo from "./Logo";
import OptionsMenu from "./OptionsMenu";
import Help from "./Help";

const Header = () => {
  const dataContext = useContext(DataContext);
  const { status } = useMemo(() => dataContext, [dataContext]);
  const { theme, isOptionsOpen, setIsOptionsOpen, isHelpOpen, setIsHelpOpen } = useContext(DataContext);
  const openOptions = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };
  return (
    <header>
      <div id="headerLeft">
        <Logo
          strokeColor={theme === "light-theme" ? "#f4f4f4" : "#c0c0c0"}
          logoWidth={40}
          logoHeight={25}

        />TimeTally
      </div>
      <div className={`status ${status !== "" ? "show" : ""}`}>{status}</div>
      <div id="headerRight"><span
        className="material-symbols-outlined rowButton" onClick={openOptions}>more_vert</span></div>
      {isOptionsOpen && <OptionsMenu />}
      {isHelpOpen && <Help />}
    </header>
  );
};

export default Header;
