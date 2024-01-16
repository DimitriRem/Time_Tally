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
    clients,
    currentNav,
    setStatus,
    addNewClientClose,
    setAddNewClientIsVisible,
    api,
    fetchData,
  } = useContext(DataContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddClientName(event.target.value);
  };

  const hideCancel = currentNav === "clients";

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient();
  };

  const addClient = async () => {
    setNewClientDetails({ name: addClientName });
    const listClients = [...clients, newClientDetails];
    setAddNewClientIsVisible(false);
    const result = api("/clients", "POST", newClientDetails);
    setStatus("New client added.");
    fetchData();
  };

  useEffect(() => {
    setNewClientDetails({ name: addClientName });
  }, [addClientName]);

  return (
    <div id="addClientContainer" className="entryContainer">
      <div className="entryHeader">
        <span>Add a Client</span>
      </div>
      <form onSubmit={handleAddClient} id="addClientForm">
        <label htmlFor="addClientName">Client Name:</label>
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
        <br />
        <button
          className="cancelButton"
          onClick={addNewClientClose}
          hidden={hideCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewClient;
