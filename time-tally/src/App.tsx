import { useContext } from "react";
import Header from "./Header";
import Toolbox from "./Toolbox";
import TableContainer from "./TableContainer";
import DataContext from "./context/DataContext";

function App() {
  const { theme } = useContext(DataContext);

  return (
    <div className={theme}>
      <Header />
      <div id="desktopContainer">
        <div id="toolbox">
          <Toolbox />
        </div>
        <div id="tableContainer">
          <TableContainer />
        </div>
      </div></div>
  );
}

export default App;
