import React, { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import ProjectInform from "./ProjectInform";

interface ProjectsTableRowProps {
  id: string;
  name: string;
  client: string;
}

const ProjectsTableRow: React.FC<ProjectsTableRowProps> = ({ id, name, client }) => {
  const { logItems } = useContext(DataContext);
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

  const appearsInLog = logItems.some((item) => item.project === name);
  return (
    <React.Fragment>
      <tr>
        <td>{name}</td>
        <td>{client}</td>
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
        <DeleteProject
          name={name}
          id={id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isInformModalOpen && (
        <ProjectInform setIsInformModalOpen={setIsInformModalOpen} />
      )}
      {isEditModalOpen && (
        <EditProject
          id={id}
          name={name}
          client={client}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </React.Fragment>
  );
};

export default ProjectsTableRow;
