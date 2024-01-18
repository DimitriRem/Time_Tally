import { useContext, useMemo, useState } from "react";
import DataContext from "./context/DataContext";
import Logo from "./Logo";
import OptionsMenu from "./OptionsMenu";

const Header = () => {
  const dataContext = useContext(DataContext);
  const { status, setStatus } = useMemo(() => dataContext, [dataContext]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const openOptions = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };
  return (
    <header>
      <div id="headerLeft">
        <Logo
          strokeColor={"#c0c0c0"}
          logoWidth={40}
          logoHeight={25}

        />TimeTally
      </div>
      <div className={`status ${status !== "" ? "show" : ""}`}>{status}</div>
      <div id="headerRight"><span
        className="material-symbols-outlined rowButton" onClick={openOptions}>more_vert</span></div>
      {isOptionsOpen && <OptionsMenu />}
    </header>
  );
};

export default Header;
