import React, { ChangeEvent, useEffect, useState } from "react";
import CellComponent from "../Cell";
import styles from "components/Table/table-parts/Cell/Cell.module.css";
import { Cell } from "types";

interface Props extends Cell {
  onChange: (newValue: string) => void;
}
/**
 * A Table cell that is currently selected. This changes the text label into an input for editing.
 */
const ActiveCell = (props: Props) => {
  const { value, onChange } = props;
  const [debouncedValue, setDebouncedValue] = useState(value);

  const rowCount = value.split("\n").length;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value === debouncedValue) return;
      onChange(debouncedValue);
    }, 600); // Adjust debounce delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedValue, onChange]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setDebouncedValue(newValue);
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
