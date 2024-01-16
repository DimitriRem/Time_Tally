import React, { useContext, useEffect, useState } from "react";
import DataContext from "./context/DataContext";
import ClientOption from "./ClientOption";

interface EditProjectProps {
  name: string;
  id: string;
  client: string;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

const EditProject: React.FC<EditProjectProps> = ({ name, id, client, setIsEditModalOpen }) => {
  const {
    api,
    setStatus,
    fetchData,
    clients,
    addNewClientPop,
    logItems,
  } = useContext(DataContext);

  let currentClientIndex = clients.findIndex((cl) => cl.name === client);

  const [updatedProjectName, setUpdatedProjectName] = useState(name);
  const [updatedClientIndex, setUpdatedClientIndex] =
    useState(currentClientIndex);
  const [updatedProjectItem, setUpdatedProjectItem] = useState({});

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProjectName(event.target.value);
  };
  const handleClientUpdate: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewClientPop();
    } else {
      currentClientIndex = clients.findIndex((cl) => cl.id === selectedValue);
      setUpdatedClientIndex(currentClientIndex);
    }
  };

  useEffect(() => {
    setUpdatedProjectItem({
      id: id,
      name: updatedProjectName,
      client: clients[updatedClientIndex].name,
    });
  }, [updatedProjectName, updatedClientIndex]);

  const handleProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(updatedProjectItem);
    updateProjectInLog(name, updatedProjectName, logItems);
    setIsEditModalOpen(false);
    fetchData();
  };

  interface LogEntry {
    id: string;
    client: string;
    project: string;
    rate: string;
    startTime: string;
    endTime: string;
  }

  async function updateProjectInLog(name: string, updatedProjectName: string, logItems: LogEntry[]) {
    // Check if any entries match the current project name
    const entriesToUpdate = logItems.filter((entry) => entry.project === name);

    if (entriesToUpdate.length) {
      // Update each matching entry individually and collect promises
      const updatePromises = entriesToUpdate.map((entry) =>
        api(`/log/${entry.id}`, "PATCH", {
          project: updatedProjectName,
          client: clients[updatedClientIndex].name,
        })
      );

      // Wait for all updates to finish before processing further
      Promise.all(updatePromises)
        .then(() => console.log("All projects updated successfully!"))
        .catch((error) => console.error("Error updating projects:", error));
    } else {
      console.warn(`Project "${name}" not found in the log`);
    }
  }

  const updateProject = async (updatedProjectItem: {}) => {
    const result = api(`/projects/${id}`, "PUT", updatedProjectItem);
    setStatus("Project updated");
  };

  return (
    <tr>
      <td colSpan={3} className="updateDetailsTd">
        <h2>
          Edit details for above project{" "}
          <span className="material-symbols-outlined">arrow_upward</span>
        </h2>
        <form className="editForm" onSubmit={handleProjectUpdate}>
          <label htmlFor="projectName">Project Name: </label>
          <input
            type="text"
            name="projectName"
            defaultValue={name}
            onChange={handleNameUpdate}
          />
          <br />
          <label htmlFor="client">Client: </label>
          <select
            id="client"
            name="client"
            defaultValue={currentClientIndex + 1}
            onChange={handleClientUpdate}
          >
            <option value="-2" className="utility">
              Add a new client
            </option>
            {clients.map((cl) => (
              <ClientOption key={cl.id} id={cl.id} name={cl.name} />
            ))}
          </select>
          <br />
          <button type="submit" id="updateProjectButton" className="mainButton">
            Update Project
          </button>
        </form>
        <button className="cancelButton" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditProject;
