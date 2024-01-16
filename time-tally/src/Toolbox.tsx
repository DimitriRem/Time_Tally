import { useContext } from "react";
import DataContext from "./context/DataContext";
import TimeEntry from "./TimeEntry";
import AddNewProject from "./AddNewProject";
import AddNewClient from "./AddNewClient";
import AddNewRate from "./AddNewRate";
import Toolbar from "./Toolbar";

const Toolbox = () => {
  const {
    currentNav,
    fetchError,
    isLoading,
    addNewProjectIsVisible,
    addNewClientIsVisible,
    addNewRateIsVisible,
  } = useContext(DataContext);

  return (
    <>

      <Toolbar />
      {!fetchError && !isLoading && currentNav === "log" ? <TimeEntry /> : ""}
      {addNewProjectIsVisible && (
        <div id="blackout">
          <AddNewProject />
        </div>
      )}
      {currentNav === "projects" ? <AddNewProject /> : ""}
      {addNewClientIsVisible && (
        <div id="blackout">
          <AddNewClient />
        </div>
      )}
      {currentNav === "clients" ? <AddNewClient /> : ""}
      {addNewRateIsVisible && (
        <div id="blackout">
          <AddNewRate />
        </div>
      )}
      {currentNav === "rates" ? <AddNewRate /> : ""}
    </>
  );
};

export default Toolbox;
