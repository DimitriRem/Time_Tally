import React, { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";

interface AddNewRateProps { }

const AddNewRate: React.FC<AddNewRateProps> = () => {
  const {
    addNewRateClose,
    currentNav,
    setRates,
    rates,
    setAddNewRateIsVisible,
    api,
    setStatus,
    fetchData,
  } = useContext(DataContext);

  const [addRateLabel, setAddRateLabel] = useState("");
  const [newRateDetails, setNewRateDetails] = useState({
    rate: "",
    label: "",
  });
  const [addRateNumber, setAddRateNumber] = useState("");

  const hideCancel = currentNav === "rates";

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddRateLabel(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddRateNumber(event.target.value);
  };

  const handleAddRate = (e: React.FormEvent) => {
    e.preventDefault();
    addRate(newRateDetails);
  };

  useEffect(() => {
    setNewRateDetails({
      rate: addRateNumber,
      label: addRateLabel,
    });
  }, [addRateNumber, addRateLabel]);

  const addRate = async (newRateDetails: {}) => {
    const listRates: Array<any> = [...rates, newRateDetails];
    setRates(listRates);
    setAddNewRateIsVisible(false);
    const result = api("/rates", "POST", newRateDetails);
    setStatus("New rate added.");
    fetchData();
  };

  return (
    <div id="addRateContainer" className="entryContainer">
      <div className="entryHeader">
        <span>Add a Rate</span>
      </div>
      <form onSubmit={handleAddRate} id="addRateForm">
        <label htmlFor="addRateLabelBox">Rate Label:</label>
        <input
          type="text"
          id="addRateLabelBox"
          name="addRateLabelBox"
          onChange={handleLabelChange}
          placeholder="Enter rate label"
          required
        ></input>
        <br />
        <label htmlFor="addRateNumberBox">Rate: $</label>
        <input
          type="text"
          id="addRateNumberBox"
          name="addRateNumberBox"
          onChange={handleNumberChange}
          placeholder="00"
          required
        ></input>
        /hr
        <button type="submit" id="addRateButton" className="mainButton">
          Add Rate
        </button>
        <br />
        <button
          className="cancelButton"
          onClick={addNewRateClose}
          hidden={hideCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewRate;
