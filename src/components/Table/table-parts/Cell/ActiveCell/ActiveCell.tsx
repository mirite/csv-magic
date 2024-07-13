import type { ChangeEvent, ReactElement } from "react";
import React, { useState } from "react";
import CellComponent from "../Cell";
import styles from "components/Table/table-parts/Cell/Cell.module.css";
import type { Cell } from "types";

interface Props extends Cell {
  onChange: (newValue: string) => void;
}
/**
 * A Table cell that is currently selected. This changes the text label into an input for editing.
 * @param props
 */
const ActiveCell = (props: Props): ReactElement => {
  const { value, onChange } = props;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const rowCount = value.split("\n").length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (timeoutId) window.clearTimeout(timeoutId);
    const newValue = e.currentTarget.value;
    setDebouncedValue(newValue);
    setTimeoutId(window.setTimeout(() => onChange(newValue), 300));
  };

  return (
    <CellComponent {...props}>
      <textarea
        className={styles.input}
        onChange={handleChange}
        rows={rowCount}
        value={debouncedValue}
      />
    </CellComponent>
  );
};

export default ActiveCell;
