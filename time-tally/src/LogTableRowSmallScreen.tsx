import React, { useState, useEffect } from "react";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";

interface LogTableRowProps {
    id: string;
    project: string;
    details: string;
    client: string;
    rate: string;
    startTime: string;
    endTime: string;
}

const LogTableRow: React.FC<LogTableRowProps> = ({
    id,
    project,
    details,
    client,
    rate,
    startTime,
    endTime,
}) => {
    const [startDate, setStartDate] = useState<Date>(new Date(startTime));
    const [endDate, setEndDate] = useState<Date>(new Date(startTime));
    const [numberOfHours, setNumberOfHours] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [startTimeString, setStartTimeString] = useState<string | null>(null);
    const [endTimeString, setEndTimeString] = useState<string | null>(null);

    useEffect(() => {
        setStartDate(new Date(startTime));
        setEndDate(new Date(endTime));
    }, [startTime, endTime]);

    useEffect(() => {
        if (startDate && endDate) {
            const differenceInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
            const numberOfHours = differenceInMilliseconds / (1000 * 60 * 60);
            setNumberOfHours(numberOfHours);

            setStartTimeString(
                startDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );

            setEndTimeString(
                endDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }
    }, [startDate, endDate]);

    const handleDelete = () => {
        setIsDeleteModalOpen((prevState) => !prevState);
    };

    const handleEdit = () => {
        setIsEditModalOpen((prevState) => !prevState);
    };

    return (
        <>
            <tr>

                <td colSpan={9}>
                    <div className="logRowContainer"><div className="logRowTimes">{startTimeString} - {endTimeString}</div>
                        <div className="logRowUpper">
                            <div><span className="logRowProjectName">{project}</span>  <span className="logRowClient"> for {client}</span></div>

                        </div>
                        <div>{details}</div>
                        <div className="logRowMiddle">
                            <div>{numberOfHours && `${numberOfHours.toFixed(1)}hrs`} @ ${rate}/hr = ${numberOfHours && (numberOfHours * Number(rate)).toFixed(2)}</div>
                        </div>
                        <div className="logRowLower">
                            <span className="material-symbols-outlined rowButton" onClick={handleEdit}
                            >edit
                            </span>
                            <span
                                className="material-symbols-outlined rowButton"
                                onClick={handleDelete}
                            >delete
                            </span>
                        </div>
                    </div>

                </td>

            </tr>
            {isDeleteModalOpen && (
                <DeleteEntry
                    details={details}
                    project={project}
                    id={id}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
            {isEditModalOpen && (
                <EditEntry
                    project={project}
                    id={id}
                    details={details}
                    rate={rate}
                    startDate={startDate}
                    endDate={endDate}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            )}
        </>
    );
};

export default React.memo(LogTableRow);
