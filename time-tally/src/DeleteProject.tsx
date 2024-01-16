import React, { useContext } from "react";
import DataContext from "./context/DataContext";

interface DeleteProjectProps {
  name: string;
  id: string;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ name, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteProject(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteProject = async (id: string) => {
    const result = api(`/projects/${id}`, "DELETE", "");

    setStatus("Project deleted");
  };

  return (
    <tr>
      <td colSpan={3} className="deleteConfirm">
        Are you sure you want to delete project "{name}"?
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete it!
        </button>
        <br />
        <button className="cancelButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteProject;
