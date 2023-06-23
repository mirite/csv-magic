import React, { FunctionComponent, useId } from 'react';
import { EGeneratorTypes } from "types";

interface ColumnTypeRadioProps {
  label: string;
  description: string;
  type: EGeneratorTypes;
  onChange: (e: EGeneratorTypes) => void;
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
        onChange={() => props.onChange(props.type)}
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
