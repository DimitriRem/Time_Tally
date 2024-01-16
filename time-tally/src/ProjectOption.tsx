import React from "react";

interface ProjectOptionsProps {
  name: string;
  id: string;
}

const ProjectOption: React.FC<ProjectOptionsProps> = ({ name, id }) => {
  return <option value={id}>{name}</option>;
};

export default ProjectOption;
