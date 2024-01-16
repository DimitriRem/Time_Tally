import { useContext, useMemo } from "react";
import DataContext from "./context/DataContext";

const dateOptions: object = {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const Header = () => {
  const dataContext = useContext(DataContext);
  const { status, setStatus } = useMemo(() => dataContext, [dataContext]);
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("en-UK", dateOptions);
  return (
    <header>
      <div id="headerLeft">
        <h1>TimeTally</h1>
      </div>
      <div className={`status ${status !== "" ? "show" : ""}`}>{status}</div>
      <div id="headerRight">{date}</div>
    </header>
  );
};

export default Header;
