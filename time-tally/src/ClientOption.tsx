import React from "react";

interface ClientOptionProps {
  id: string;
  name: string;
}

const ClientOption: React.FC<ClientOptionProps> = ({ id, name }) => {
  return <option value={id}>{name}</option>;
};

export default ClientOption;
