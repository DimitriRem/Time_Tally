import Header from "./Header";
import Toolbox from "./Toolbox";
import TableContainer from "./TableContainer";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Header />
      <div id="desktopContainer">
        <div id="toolbox">
          <Toolbox />
        </div>
        <div id="tableContainer">
          <TableContainer />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
