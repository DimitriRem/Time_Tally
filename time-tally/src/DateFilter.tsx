import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const DateFilter = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClearFilter
}: {
    startDate: string;
    endDate: string;
    onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearFilter: () => void;
}) => {
    const filterActive = startDate !== "" || endDate !== "";
    const { isSmallScreen } = useContext(DataContext);

    return (
        <>
            {isSmallScreen ?
                // small screen layout ----vv
                <div className={`dateFilter ${filterActive ? "dateFilterActivated" : ""}`}>
                    <div className={`${filterActive ? "filterHeaderActivated" : "filterHeader"}`}>
                        {filterActive ? <span className="material-symbols-outlined rowButton spaced"  >error</span> : ""}
                        Filter{`${filterActive ? "ing" : ""}`} by Date:{" "}
                    </div>
                    <div className="dateBlock">
                        <div><label htmlFor="startDate">Start Date: </label><br />
                            <input type="date" id="startDate" value={startDate} onChange={onStartDateChange} /></div>
                        <div><label htmlFor="endDate">End Date: </label><br />
                            <input type="date" id="endDate" value={endDate} onChange={onEndDateChange} /></div>

                    </div>
                    {filterActive ? <div> <button className="toolButton" onClick={onClearFilter}>
                        Clear Filter
                    </button></div> : ""}

                </div>
                :
                // larger screen layout ----vv
                <div className={`dateFilter ${filterActive ? "dateFilterActivated" : ""}`}>
                    <div className={`${filterActive ? "filterHeaderActivated" : "filterHeader"}`}>
                        {filterActive ? <span className="material-symbols-outlined rowButton spaced"  >error</span> : ""}
                        Filter{`${filterActive ? "ing" : ""}`} by Date:{" "}
                    </div>
                    <label htmlFor="startDate">Start Date: </label>
                    <input type="date" id="startDate" value={startDate} onChange={onStartDateChange} />
                    <label htmlFor="endDate">End Date: </label>
                    <input type="date" id="endDate" value={endDate} onChange={onEndDateChange} />
                    {filterActive ? <span className="material-symbols-outlined rowButton" onClick={onClearFilter}>
                        cancel
                    </span> : ""}
                </div>
            }</>
    );
};

export default DateFilter;