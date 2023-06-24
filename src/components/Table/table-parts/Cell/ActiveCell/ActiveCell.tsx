import React, { ChangeEvent } from "react";
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
  const rowCount = value.split("\n").length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    onChange(newValue);
  };

  return (
    <CellComponent {...props}>
      <textarea
        className={styles.input}
        onChange={handleChange}
        rows={rowCount}
        value={value}
      />
    </CellComponent>
  );
};

export default ActiveCell;
