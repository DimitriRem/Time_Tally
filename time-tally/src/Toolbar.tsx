import React, { useContext, useCallback } from "react";
import DataContext from "./context/DataContext";

interface ToolbarProps {
  currentNav: string;
  setCurrentNav: (dest: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ currentNav, setCurrentNav }) => {
  const navigate = useCallback(
    (dest: string) => {
      setCurrentNav(dest);
    },
    [setCurrentNav]
  );

  return (
    <div id="toolbar">
      <div
        id="logButton"
        className={currentNav === "log" ? "toolButtonCurrent" : "toolButton"}
        onClick={() => navigate("log")}
      >
        Log Time
      </div>
      <div
        id="projectsButton"
        className={
          currentNav === "projects" ? "toolButtonCurrent" : "toolButton"
        }
        onClick={() => navigate("projects")}
      >
        Projects
      </div>
      <div
        id="clientsButton"
        className={
          currentNav === "clients" ? "toolButtonCurrent" : "toolButton"
        }
        onClick={() => navigate("clients")}
      >
        Clients
      </div>
      <div
        id="ratesButton"
        className={currentNav === "rates" ? "toolButtonCurrent" : "toolButton"}
        onClick={() => navigate("rates")}
      >
        Rates
      </div>
    </div>
  );
};

const ToolbarWrapper = () => {
  const { currentNav, setCurrentNav } = useContext(DataContext);

  return <Toolbar currentNav={currentNav} setCurrentNav={setCurrentNav} />;
};

export default ToolbarWrapper;
