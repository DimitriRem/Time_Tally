import React, { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import DeleteRate from "./DeleteRate";
import EditRate from "./EditRate";
import RateInform from "./RateInform";

interface LogItem {
  rate: string;
}

interface RatesTableRowProps {
  id: string;
  rate: string;
  label: string;
}

const RatesTableRow: React.FC<RatesTableRowProps> = ({ id, rate, label }) => {
  const { logItems, currency } = useContext(DataContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInformModalOpen, setIsInformModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen((prevState) => !prevState);
  };
  const handleInform = () => {
    setIsInformModalOpen((prevState) => !prevState);
  };

  const appearsInLog = logItems.some((item: LogItem) => item.rate === rate);
  return (
    <React.Fragment>
      <tr>
        <td>{label}</td>
        <td>{currency}{rate}/hr</td>
        <td className="rightTD">
          <span
            className="material-symbols-outlined rowButton"
            onClick={handleEdit}
          >
            edit
          </span>
          {appearsInLog ? (
            <span
              className="material-symbols-outlined rowButton unavailable"
              onClick={handleInform}
            >
              {" "}
              delete
            </span>
          ) : (
            <span
              className="material-symbols-outlined rowButton "
              onClick={handleDelete}
            >
              {" "}
              delete
            </span>
          )}
        </td>
      </tr>
      {isDeleteModalOpen && (
        <DeleteRate
          label={label}
          id={id}
          rate={rate}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isInformModalOpen && (
        <RateInform setIsInformModalOpen={setIsInformModalOpen} />
      )}
      {isEditModalOpen && (
        <EditRate
          id={id}
          label={label}
          rate={rate}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </React.Fragment>
  );
};

export default RatesTableRow;
