import React, { useMemo, useContext, useState, ChangeEvent } from "react";
import LogTableRow from "./LogTableRow";
import DataContext from "./context/DataContext";

const LogTable = () => {
  const { logItems, isLoading, fetchError } = useContext(DataContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  const filteredLogs = useMemo(() => {
    if (startDate && endDate) {
      return logItems.filter((log) => {
        const logDate = new Date(log.startTime).toISOString().slice(0, 10);
        return logDate >= startDate && logDate <= endDate;
      });
    } else {
      return logItems;
    }
  }, [logItems, startDate, endDate]);

  const sortedLogs = useMemo(() => {
    return [...filteredLogs].sort(
      (a, b) => Date.parse(b.startTime) - Date.parse(a.startTime)
    );
  }, [filteredLogs]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setFilterActive(true);
  };

  const startInput = document.getElementById("startDate") as HTMLInputElement;
  const endInput = document.getElementById("endDate") as HTMLInputElement;

  const clearFilter = () => {
    startInput.value = "";
    endInput.value = "";
    setStartDate("");
    setEndDate("");
    setFilterActive(false);
  };

  const renderTable = () => {
    let lastDate: string = "";
    return (
      <>
        {isLoading && <p>Loading logItems...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        <div id="tableTop">
          <div className="re-heading">Time Logged</div>

          <div
            className={`dateFilter ${filterActive ? "dateFilterActivated" : ""
              }`}
          >
            <div
              id="filterHeader"
              className={`${filterActive ? "filterHeaderActivated" : "filterHeader"
                }`}
            >
              Display{`${filterActive ? "ing" : ""}`} Date Range:{" "}
            </div>
            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />{" "}
            <label htmlFor="endDate">End Date: </label>{" "}
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
            <span
              className="material-symbols-outlined rowButton"
              onClick={clearFilter}
            >
              cancel
            </span>
          </div>
        </div>
        {!fetchError && !isLoading && logItems.length ? (
          <table className="re-table">
            <thead>
              <tr>
                <th className="re-col-wide">Project Name</th>
                <th className="re-col-wide">Details</th>
                <th className="re-col-wide">Client</th>
                <th className="re-col-narrow">Rate</th>
                <th className="re-col-narrow">Start Time</th>
                <th className="re-col-narrow">End Time</th>
                <th className="re-col-narrow">No. of Hours</th>
                <th className="re-col-narrow">Total Fee</th>
                <th className="re-col-narrow"></th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log) => {
                const options: {} = {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                };
                const startDate = new Date(log.startTime).toLocaleDateString(
                  "en-UK",
                  options
                );
                if (startDate !== lastDate) {
                  lastDate = startDate;
                  return (
                    <React.Fragment key={startDate}>
                      <tr className="dateTR">
                        <td colSpan={9} className="re-dateRow">
                          {startDate}
                        </td>
                      </tr>
                      <LogTableRow
                        key={log.id}
                        id={log.id}
                        project={log.project}
                        details={log.details}
                        client={log.client}
                        rate={log.rate}
                        startTime={log.startTime}
                        endTime={log.endTime}
                      />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <LogTableRow
                      key={log.id}
                      id={log.id}
                      project={log.project}
                      details={log.details}
                      client={log.client}
                      rate={log.rate}
                      startTime={log.startTime}
                      endTime={log.endTime}
                    />
                  );
                }
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
        )}
      </>
    );
  };

  return <div>{renderTable()}</div>;
};

export default LogTable;
