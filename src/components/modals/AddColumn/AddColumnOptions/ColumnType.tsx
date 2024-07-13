import type { FunctionComponent } from "react";
import React, { useId } from "react";

interface ColumnTypeRadioProps {
  label: string;
  description: string;
  onChange: () => void;
  default?: boolean;
}

const ColumnTypeRadio: FunctionComponent<ColumnTypeRadioProps> = (props) => {
  const id = useId();
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="column-type"
        onChange={() => props.onChange()}
        defaultChecked={props.default}
      />
      <label htmlFor={id}>
        <strong>{props.label}</strong>
      </label>
      <p>{props.description}</p>
    </div>
  );
};

export default ColumnTypeRadio;
