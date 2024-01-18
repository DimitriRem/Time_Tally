import React from "react";

interface ProjectInformProps {
  setIsInformModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProjectInform: React.FC<ProjectInformProps> = ({ setIsInformModalOpen }) => {
  const cancelDelete = () => {
    setIsInformModalOpen(false);
  };
  return (
    <tr>
      <td colSpan={3} className="deleteConfirm">
        This project can not be deleted. <br />
        <span style={{ fontWeight: "normal" }}>
          Because this project has time logged to it, deleting will cause data
          corruption. <br />
          Delete all relevant log entries and try again.
        </span>
        <br />
        <br />
        <button className="toolButton" onClick={cancelDelete}>
          Close
        </button>
      </td>
    </tr>
  );
};

export default ProjectInform;
