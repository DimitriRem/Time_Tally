import React from "react";

interface RateOptionProps {
  rate: string;
  id: string;
  label: string;
}

const RateOption: React.FC<RateOptionProps> = ({ rate, id, label }) => {
  return (
    <option value={id}>
      ${rate}/hr {label}
    </option>
  );
};

export default RateOption;
