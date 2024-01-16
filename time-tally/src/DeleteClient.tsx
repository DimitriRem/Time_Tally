import React, { useContext } from "react";
import DataContext from "./context/DataContext";

interface DeleteClientProps {
  name: string;
  id: string;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const DeleteClient: React.FC<DeleteClientProps> = ({ name, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteClient(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteClient = async (id: string) => {
    const result = api(`/clients/${id}`, "DELETE", "");
    setStatus("Client deleted");
  };

  return (
    <tr>
      <td colSpan={3} className="deleteConfirm">
        Are you sure you want to delete Client "{name}"?
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete client!
        </button>
        <br />
        <button className="cancelButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteClient;
