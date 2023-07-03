import React, { FunctionComponent } from "react";
import styles from "../TableHeading.module.css";
import { RowAction } from "../../../../../Editor/Editor";

interface RowHeadingProps {
  onAction: (actionName: RowAction) => void;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (props) => {
  const { onAction } = props;
  return (
    <th scope="row" className={styles.cell}>
      <div className={styles.rowHeading}>
        <button className={styles.button} onClick={() => onAction("duplicate")}>
          Duplicate
        </button>
        <button
          className={styles.buttonDanger}
          onClick={() => onAction("delete")}
        >
          Delete
        </button>
      </div>
    </th>
  );
};

export default RowHeading;
