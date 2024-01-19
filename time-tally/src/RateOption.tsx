import React, { useContext } from "react";
import DataContext from "./context/DataContext";

interface RateOptionProps {
  rate: string;
  id: string;
  label: string;
}

const RateOption: React.FC<RateOptionProps> = ({ rate, id, label }) => {
  const { currency } = useContext(DataContext);
  return (
    <option value={id}>
      {currency}{rate}/hr {label}
    </option>
  );
};

export default RateOption;
