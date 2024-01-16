import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import ProjectOption from "./ProjectOption";
import RateOption from "./RateOption";
import DataContext from "./context/DataContext";

const TimeEntry = () => {
  const {
    projects,
    rates,
    newLogItem,
    isSmallScreen,
    setStatus,
    setNewLogItem,
    addNewProjectPop,
    addNewRatePop,
    api,
    fetchData,
  } = useContext(DataContext);

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalFee, setTotalFee] = useState("0");
  const [formDate, setFormDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [finalStartTime, setFinalStartTime] = useState<Date | null>(null);
  const [finalEndTime, setFinalEndTime] = useState<Date | null>(null);

  const mainTextColorStyle = {
    color: "var(--mainTextColor)",
  };

  const [smallScreenOverride, setSmallScreenOverride] = useState<boolean>(false);

  const handleExpand = () => {
    setSmallScreenOverride(true);
  }

  const handleProjectOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewProjectPop();
    } else {
      const matchingProjectIndex = projects.findIndex(
        (project) => project.id === selectedValue
      );

      setCurrentProjectIndex(matchingProjectIndex);
    }
  };

  const handleRateOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = String(event.target.value);
    if (selectedValue === "-2") {
      addNewRatePop();
    } else {
      const matchingRateIndex = rates.findIndex(
        (rate) => rate.id === selectedValue
      );

      setCurrentRateIndex(matchingRateIndex);
    }
  };

  const handleStartTimeChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate(event.target.value);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const startDate = new Date(`${formDate}T${startTime}`);
      const endDate = new Date(`${formDate}T${endTime}`);
      const differenceInMilliseconds = Math.abs(Number(endDate) - Number(startDate));

      setTotalHours(Number((differenceInMilliseconds / (1000 * 60 * 60)).toFixed(2)));
      setFinalStartTime(startDate);
      setFinalEndTime(endDate);
    }
  }, [formDate, startTime, endTime]);

  useEffect(() => {
    if (totalHours !== 0 && currentRateIndex !== -1) {
      setTotalFee((totalHours * Number(rates[currentRateIndex].rate)).toFixed(2));
    }
  }, [totalHours, currentRateIndex]);

  useEffect(() => {
    setNewLogItem({
      project: projects[currentProjectIndex].name,
      details: details,
      client: projects[currentProjectIndex].client,
      rate: rates[currentRateIndex].rate,
      startTime: finalStartTime,
      endTime: finalEndTime,
    });
  }, [
    details,
    currentProjectIndex,
    currentRateIndex,
    finalStartTime,
    finalEndTime,
  ]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogItem) {
      return;
    }
    const result: any = await api("/log", "POST", newLogItem);
    setStatus("Hours submitted");
    fetchData();
    setNewLogItem([]);
  };


  return (
    <>
      {isSmallScreen && !smallScreenOverride ? <button className="smallScreenAddButton"
        onClick={handleExpand}>
        Add a New Entry
      </button>
        :
        <div id="timeEntryContainer" className="entryContainer">
          Log time for
          <form className="logForm" onSubmit={handleFormSubmit}>
            <div id="timeEntryHeader" className="entryHeader">
              <div className="entryHeaderLeft">
                <div id="projectName" className="projectName">
                  {projects[currentProjectIndex].name}
                </div>
                <div id="clientName" className="clientName">
                  <span style={mainTextColorStyle}>for</span>{" "}
                  {projects[currentProjectIndex].client}
                </div>
              </div>
              <div id="projectSelector">
                <span style={mainTextColorStyle}>or</span>{" "}
                <select name="project" onChange={handleProjectOptionChange}>
                  <option value="">Another Project</option>
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
              </div>
            </div>
            <div id="logFormLeft">
              <label htmlFor="startTime">Start time: </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                onChange={handleStartTimeChange}
                required
              />{" "}
              <input type="date" value={formDate} onChange={handleDateChange} />
              <br />
              <label htmlFor="endTime">End time: </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                onChange={handleEndTimeChange}
                required
              />
              <br />
              <label htmlFor="rate">Rate: </label>
              <select id="rate" name="rate" onChange={handleRateOptionChange}>
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
            </div>

            <label htmlFor="descriptionBox">Work details:</label>
            <br />
            <textarea
              id="descriptionBox"
              required
              name="descriptionBox"
              placeholder="Describe what was done."
              rows={4}
              cols={5}
              value={details}
              onChange={handleDetailsChange}
            ></textarea>

            <button type="submit" id="submitHours" className="mainButton">
              Submit Hours
              <br />
              <span className="buttonTotals">
                (Total: {totalHours}hrs, ${totalFee})
              </span>
            </button>
          </form>
        </div>
      }</>
  );
};

export default TimeEntry;
