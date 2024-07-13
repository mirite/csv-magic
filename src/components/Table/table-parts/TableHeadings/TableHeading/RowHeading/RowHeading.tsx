import type { FunctionComponent, ReactElement } from "react";
import React from "react";
import styles from "../TableHeading.module.css";
import type { RowAction } from "../../../../../Editor/Editor";

interface RowHeadingProps {
  onAction: (actionName: RowAction) => void;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (
  props,
): ReactElement => {
  const { onAction } = props;
  return (
    <th scope="row" className={styles.cell}>
      <div className={styles.rowHeading}>
        <button
          className={styles.button}
          type={"button"}
          onClick={() => onAction("duplicate")}
        >
          Duplicate
        </button>
        <button
          className={styles.buttonDanger}
          type={"button"}
          onClick={() => onAction("delete")}
        >
          Delete
        </button>
      </div>
    </th>
  );
};

export default RowHeading;
