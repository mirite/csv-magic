import { getColumns } from "modules/access-helpers";
import type { FunctionComponent } from "react";
import React, { useId } from "react";
import type { Table } from "types";

interface KeyInFileSelectorProps {
  table: Table;
  label: string;
  onChange: (value: number) => void;
}

const KeyInFileSelector: FunctionComponent<KeyInFileSelectorProps> = (
  props,
) => {
  if (!props.table) {
    return <p>No Keys Found In File</p>;
  }
  const columns = getColumns(props.table);
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{props.label}</label>
      <select
        id={id}
        onChange={(event) =>
          props.onChange(Number.parseInt(event.currentTarget.value))
        }
      >
        <option value="">Please select a key</option>
        {columns.map((key) => (
          <option key={key.id} value={key.id}>
            {key.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default KeyInFileSelector;
