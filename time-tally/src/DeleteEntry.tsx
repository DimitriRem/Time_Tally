import React, { useContext } from "react";
import DataContext from "./context/DataContext";

interface DeleteEntryProps {
  details: string;
  project: string;
  id: string;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const DeleteEntry: React.FC<DeleteEntryProps> = ({ details, project, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, fetchData } = useContext(DataContext);
  const confirmDelete = () => {
    deleteEntry(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteEntry = async (id: string) => {
    const result = api(`/log/${id}`, "DELETE", "");
    setStatus("Entry deleted");
  };

  return (
    <tr>
      <td colSpan={9} className="deleteConfirm">
        Are you sure you want to delete the above entry?
        <span style={{ fontWeight: "normal" }}>
          ({details} for {project})
        </span>
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete it!
        </button>
        <br />
        <button className="toolButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteEntry;
