import React, { useContext } from "react";
import DataContext from "./context/DataContext";
import LogTable from "./LogTable";
import ProjectsTable from "./ProjectsTable";
import ClientsTable from "./ClientsTable";
import RatesTable from "./RatesTable";

interface TableContainerProps { }
const TableContainer: React.FC<TableContainerProps> = () => {
  const { currentNav } = useContext(DataContext);

  let tableComponent;
  switch (currentNav) {
    case "log":
      tableComponent = <LogTable />;
      break;
    case "projects":
      tableComponent = <ProjectsTable />;
      break;
    case "clients":
      tableComponent = <ClientsTable />;
      break;
    case "rates":
      tableComponent = <RatesTable />;
      break;
    default:
      tableComponent = null;
  }

  return <>{tableComponent}</>;
};

export default TableContainer;
