import React, { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";

interface Client {
  name: string;
}

interface AddNewClientProps { }

const AddNewClient: React.FC<AddNewClientProps> = () => {
  const [addClientName, setAddClientName] = useState("");
  const [newClientDetails, setNewClientDetails] = useState<Client>({
    name: "",
  });
  const {
    currentNav,
    setStatus,
    setAddNewClientIsVisible,
    isSmallScreen,
    api,
    fetchData,
  } = useContext(DataContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddClientName(event.target.value);
  };
  const [smallScreenOverride, setSmallScreenOverride] = useState<boolean>(false);

  const handleExpand = () => {
    setSmallScreenOverride(true);
  }
  const handleClose = () => {
    setSmallScreenOverride(false);
  }

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient();
  };

  const addClient = async () => {
    setNewClientDetails({ name: addClientName });
    setAddNewClientIsVisible(false);
    api("/clients", "POST", newClientDetails);

    setStatus("New client added.");
    fetchData();
  };

  useEffect(() => {
    setNewClientDetails({ name: addClientName });
  }, [addClientName]);

  return (
    <>
      {isSmallScreen && !smallScreenOverride ? <button className="smallScreenAddButton"
        onClick={handleExpand}>
        Add a New Client
      </button>
        :

        <div id="addClientContainer" className="entryContainer">
          <div className="entryHeader">
            Add a New Client {isSmallScreen ? <button className="toolButton" onClick={handleClose}>
              Cancel
            </button> : ""}

          </div>
          <form onSubmit={handleAddClient} id="addClientForm">
            <label htmlFor="addClientName">Client Name: </label>
            <input
              type="text"
              id="addClientName"
              name="addClientName"
              value={addClientName}
              onChange={handleNameChange}
              placeholder="Enter client name"
              required
            />
            <button type="submit" id="addClientButton" className="mainButton">
              Add Client
            </button>

          </form>
        </div>
      }</>
  );
};

export default AddNewClient;
