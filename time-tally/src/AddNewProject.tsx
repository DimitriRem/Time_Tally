import React, { useEffect, useState, useContext, ChangeEvent } from "react";
import ClientOption from "./ClientOption";
import DataContext from "./context/DataContext";

interface AddNewProjectProps { }

const AddNewProject: React.FC<AddNewProjectProps> = () => {
  const {
    addNewProjectClose,
    clients,
    currentNav,
    projects,
    isSmallScreen,
    addNewClientPop,
    setProjects,
    setAddNewProjectIsVisible,
    api,
    setStatus,
    fetchData
  } = useContext(DataContext);
  const [addProjectName, setAddProjectName] = useState("");
  const [clientSelected, setClientSelected] = useState(false);
  const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const [newProjectDetails, setNewProjectDetails] = useState({
    name: "",
    client: "",
  });

  const [smallScreenOverride, setSmallScreenOverride] = useState<boolean>(false);

  const handleExpand = () => {
    setSmallScreenOverride(true);
  }
  const handleClose = () => {
    setSmallScreenOverride(false);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddProjectName(event.target.value);
  };

  const hideCancel = currentNav === "projects";

  const handleClientChange: React.ChangeEventHandler<HTMLSelectElement> = (event: ChangeEvent<HTMLSelectElement>) => {
    setClientSelected(true);
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewClientPop();
    } else {
      const matchingClientIndex: number = clients.findIndex(
        (client) => client.id === selectedValue
      );

      setCurrentClientIndex(matchingClientIndex);
    }
  };

  useEffect(() => {
    setNewProjectDetails({
      name: addProjectName,
      client: clients[currentClientIndex].name,
    });
  }, [addProjectName, currentClientIndex]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientSelected) {
      setStatus("No Client Selected!");
      return;
    }
    addProject(newProjectDetails);
  };

  const addProject = async (newProjectDetails: {}) => {
    const listProjects: Array<any> = [...projects, newProjectDetails];
    setProjects(listProjects);
    setAddNewProjectIsVisible(false);
    const result = api("/projects", "POST", newProjectDetails);
    setStatus("new project added.");
    fetchData();
  };

  return (
    <>
      {isSmallScreen && !smallScreenOverride ? <button className="smallScreenAddButton"
        onClick={handleExpand}>
        Add a New Project
      </button>
        :
        <div id="addProjectContainer" className="entryContainer">
          <div className="entryHeader">
            Add a New Project{isSmallScreen ? <button className="toolButton" onClick={handleClose}>
              Cancel
            </button> : ""}
          </div>
          <form onSubmit={handleAddProject} id="addProjectForm">
            <label htmlFor="projectNameBox">Project Name:</label>
            <input
              type="text"
              id="addProjectName"
              name="addProjectName"
              onChange={handleNameChange}
              placeholder="Enter project name"
              required
            ></input>
            <br />
            <label htmlFor="clientList">Client:</label>
            <select
              id="clientList"
              name="clientList"
              onChange={handleClientChange}
              required
            >
              <option value="-1">Select Client</option>
              <option value="-2" className="utility">
                + Add a new Client
              </option>
              {clients.map((client) => (
                <ClientOption key={client.id} id={client.id} name={client.name} />
              ))}
            </select>

            <button type="submit" id="addProjectButton" className="mainButton">
              Add Project
            </button>
            <br />
            <button
              className="cancelButton"
              onClick={addNewProjectClose}
              hidden={hideCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      }</>
  );
};

export default AddNewProject;
