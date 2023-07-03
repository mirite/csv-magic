import React from "react";
import { Cell } from "types";
import CellComponent from "./Cell";

const InactiveCell = (props: Cell) => {
  const { value, id } = props;
  return (
    <CellComponent {...props}>
      <span data-id={id}>{value}</span>
    </CellComponent>
  );
};

export default InactiveCell;
