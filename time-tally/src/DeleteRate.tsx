import React, { useContext } from "react";
import DataContext from "./context/DataContext";

interface DeleteRateProps {
  label: string;
  id: string;
  rate: string;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const DeleteRate: React.FC<DeleteRateProps> = ({ label, id, rate, setIsDeleteModalOpen }) => {
  const { api, setStatus, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteRate(id);
    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteRate = async (id: string) => {
    const result = api(`/rates/${id}`, "DELETE", "");
    setStatus("Rate deleted");
  };

  return (
    <tr>
      <td colSpan={3} className="deleteConfirm">
        Are you sure you want to delete rate "{label}"?
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete rate!
        </button>
        <br />
        <button className="toolButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteRate;
