import React from "react";
import { ICell } from "types";
import Cell from "./Cell";

const InactiveCell = (props: ICell) => {
  const { value, id } = props;
  return (
    <Cell {...props}>
      <span data-id={id}>{value}</span>
    </Cell>
  );
};

export default InactiveCell;
