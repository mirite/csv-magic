import React, { ChangeEvent, FunctionComponent, useState } from "react";

interface FilterValueProps {
  value: string;
  count: number;
  onChange: (value: string, state: boolean) => void;
  checked: boolean;
}

const FilterValue: FunctionComponent<FilterValueProps> = (props) => {
  const { value, count, onChange: onToggle, checked } = props;

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked: newValue } = e.currentTarget;
    onToggle(value, newValue);
  };

  return (
    <li>
      <label>
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        {value} ({count})
      </label>
    </li>
  );
};

export default FilterValue;
