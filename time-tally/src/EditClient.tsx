import React, { useContext, useState } from "react";
import DataContext from "./context/DataContext";

interface EditClientProps {
  name: string;
  id: string;
  setIsEditModalOpen: (isOpen: boolean) => void;
}
const EditClient: React.FC<EditClientProps> = ({ name, id, setIsEditModalOpen }) => {
  const { api, setStatus, fetchData, projects, logItems } =
    useContext(DataContext);

  const [updatedClientName, setUpdatedClientName] = useState(name);

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedClientName(event.target.value);
  };

  async function handleClientUpdate(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateClient(updatedClientName);
      await updateClientInLog(name, updatedClientName, logItems);
      await updateClientInProjects(name, updatedClientName, projects);
      setIsEditModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  interface LogEntry {
    id: string;
    client: string;
    project: string;
    rate: string;
    startTime: string;
    endTime: string;
  }

  async function updateClientInLog(
    name: string,
    updatedClientName: string,
    logItems: LogEntry[]
  ): Promise<void> {
    try {
      const entriesToUpdate = logItems.filter((entry) => entry.client === name);

      if (entriesToUpdate.length) {
        await Promise.all(
          entriesToUpdate.map((entry) =>
            api(`/log/${entry.id}`, "PATCH", {
              client: updatedClientName,
            })
          )
        );
        console.log("All clients updated in log successfully!");
      } else {
        console.warn(`Client "${name}" not found in the log`);
      }
    } catch (error) {
      console.error("Error updating clients in log:", error);
    }
  }

  interface ProjectEntry {
    id?: string;
    name: string;
    client: string;
  }

  async function updateClientInProjects(
    name: string,
    updatedClientName: string,
    projects: ProjectEntry[]
  ) {
    // Check if any project entries match the current client name
    const entriesToUpdate = projects.filter((entry) => entry.client === name);

    if (entriesToUpdate.length) {
      // Update each matching entry individually and collect promises
      const updatePromises = entriesToUpdate.map((entry) =>
        api(`/projects/${entry.id}`, "PATCH", {
          client: updatedClientName,
        })
      );

      // Wait for all updates to finish before processing further
      Promise.all(updatePromises)
        .then(() => console.log("All cients updated in projects successfully!"))
        .catch((error) =>
          console.error("Error updating clients in projects:", error)
        );
    } else {
      console.warn(`Client "${name}" not found in projects`);
    }
  }

  const updateClient = async (updatedClientName: string) => {
    api(`/clients/${id}`, "PUT", {
      name: updatedClientName,
    });
    setStatus("Client updated");
  };

  return (
    <tr>
      <td colSpan={3} className="updateDetailsTd">
        <h2>
          Edit name for above client{" "}
          <span className="material-symbols-outlined">arrow_upward</span>
        </h2>
        <form className="editForm" onSubmit={handleClientUpdate}>
          <label htmlFor="clientName">Client Name: </label>
          <input
            type="text"
            id="cientName"
            name="cientName"
            defaultValue={name}
            onChange={handleNameUpdate}
          />
          <br />
          <button type="submit" id="updateClientButton" className="mainButton">
            Update Client
          </button>
        </form>
        <button className="toolButton" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditClient;
