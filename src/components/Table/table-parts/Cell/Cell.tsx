import React, { PropsWithChildren } from "react";
import styles from "./Cell.module.css";
import { Cell } from "types";

type IProps = PropsWithChildren & Cell;

/**
 * A single cell within a Table.
 * @param props
 */
const Cell = (props: IProps) => {
  const { children, id } = props;

  return (
    <td className={styles.container} data-id={id}>
      {children}
    </td>
  );
};

export default Cell;
