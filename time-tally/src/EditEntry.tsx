import React, { useEffect, useState, useContext } from "react";
import ProjectOption from "./ProjectOption";
import RateOption from "./RateOption";
import DataContext from "./context/DataContext";

interface EditEntryProps {
  id: string;
  project: string;
  details: string;
  rate: string;
  startDate: Date;
  endDate: Date;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

const EditEntry: React.FC<EditEntryProps> = ({
  id,
  project,
  details,
  rate,
  startDate,
  endDate,
  setIsEditModalOpen,
}) => {
  const {
    projects,
    rates,
    api,
    setStatus,
    addNewProjectPop,
    addNewRatePop,
    fetchData,
  } = useContext(DataContext);

  let currentProjectIndex = projects.findIndex((proj) => proj.name === project);
  let currentRateIndex = rates.findIndex((rat) => rat.rate === rate);

  const [updatedProjectIndex, setUpdatedProjectIndex] =
    useState(currentProjectIndex);
  const [updatedProjectDetails, setUpdatedProjectDetails] = useState(details);
  const [updatedProjectRateIndex, setUpdatedProjectRateIndex] =
    useState(currentRateIndex);
  const [updatedProjectStartTime, setUpdatedProjectStartTime] = useState(
    startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
  const [updatedDate, setUpdatedDate] = useState(
    startDate.toISOString().split("T")[0]
  );
  const [updatedProjectEndTime, setUpdatedProjectEndTime] = useState(
    endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
  const [updatedlogItem, setUpdatedlogItem] = useState({});

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleProjectUpdate: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewProjectPop();
    } else {
      currentProjectIndex = projects.findIndex(
        (proj) => proj.id === selectedValue
      );

      setUpdatedProjectIndex(currentProjectIndex);
    }
  };

  const handleDetailsUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProjectDetails(event.target.value);
  };

  const handleRateUpdate: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewRatePop();
    } else {
      currentRateIndex = rates.findIndex((rat) => rat.id === selectedValue);
      setUpdatedProjectRateIndex(currentRateIndex);
    }
  };

  const handleStartTimeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProjectStartTime(event.target.value);
  };

  const handleDateUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDate(event.target.value);
  };

  const handleEndTimeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProjectEndTime(event.target.value);
  };

  useEffect(() => {
    setUpdatedlogItem({
      id: id,
      project: projects[updatedProjectIndex].name,
      details: updatedProjectDetails,
      client: projects[updatedProjectIndex].client,
      rate: rates[updatedProjectRateIndex].rate,
      startTime: new Date(`${updatedDate}T${updatedProjectStartTime}`),
      endTime: new Date(`${updatedDate}T${updatedProjectEndTime}`),
    });
  }, [
    updatedProjectIndex,
    updatedProjectDetails,
    updatedProjectRateIndex,
    updatedDate,
    updatedProjectStartTime,
    updatedProjectEndTime,
  ]);

  const handleEntryUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateEntry(updatedlogItem);
    setIsEditModalOpen(false);
    fetchData();
  };

  const updateEntry = async (updatedlogItem: {}) => {
    api(`/log/${id}`, "PUT", updatedlogItem);
    setStatus("Entry updated");
  };

  return (
    <tr>
      <td colSpan={9} className="updateDetailsTd">
        <h2>
          Edit details for above entry{" "}
          <span className="material-symbols-outlined">arrow_upward</span>
        </h2>
        <form className="editForm" onSubmit={handleEntryUpdate}>
          <label htmlFor="projectName">Project Name: </label>
          <select
            name="project"
            defaultValue={currentProjectIndex + 1}
            onChange={handleProjectUpdate}
          >
            <option value="null">Another Project</option>
            <option value="-2" className="utility">
              + Add a new Project
            </option>
            {projects.map((project) => (
              <ProjectOption
                key={project.id}
                id={project.id}
                name={project.name}
              />
            ))}
          </select>
          <br /> <label htmlFor="projectDetails">Details: </label>
          <input
            type="text"
            id="projectDetails"
            name="projectDetails"
            defaultValue={details}
            onChange={handleDetailsUpdate}
          />
          <br />
          <label htmlFor="rate">Rate: </label>
          <select
            id="rate"
            name="rate"
            defaultValue={currentRateIndex + 1}
            onChange={handleRateUpdate}
          >
            {rates.map((rate) => (
              <RateOption
                key={rate.id}
                id={rate.id}
                rate={rate.rate}
                label={rate.label}
              />
            ))}
            <option value="-2" className="utility">
              Add a new rate
            </option>
          </select>
          <br />
          <label htmlFor="startTime">Start time: </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            defaultValue={startDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
            onChange={handleStartTimeUpdate}
            required
          />{" "}
          <input
            type="date"
            defaultValue={startDate.toISOString().split("T")[0]}
            onChange={handleDateUpdate}
          />
          <br />
          <label htmlFor="endTime">End time: </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={endDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
            onChange={handleEndTimeUpdate}
            required
          />
          <br />
          <button type="submit" id="updateentryButton" className="mainButton">
            Update
          </button>
        </form>
        <button className="toolButton" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditEntry;
