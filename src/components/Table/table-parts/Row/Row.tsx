import React from "react";
import ActiveCell from "../Cell/ActiveCell/ActiveCell";
import { Cell, Row } from "types";
import RowHeading from "../TableHeadings/TableHeading/RowHeading/RowHeading";
import InactiveCell from "../Cell/InactiveCell";

interface IProps extends Row {
  /**
   * Handler for when the data in a cell is changed.
   */
  onCellChange: (arg0: Cell, newValue: string) => void;

  /**
   * The ID of the active cell within the Table (if there is one)
   */
  activeCell?: string;

  onAction: (action: string) => void;
}

/**
 * Displays a row of cells within a Table.
 */
function Row(props: IProps) {
  const { contents: cells, activeCell, onCellChange, onAction } = props;
  return (
    <tr>
      <RowHeading onAction={(action: string) => onAction(action)} />
      {cells.map((cell) =>
        activeCell === cell.id ? (
          <ActiveCell
            key={cell.id}
            onChange={(newValue) => onCellChange(cell, newValue)}
            {...cell}
          />
        ) : (
          <InactiveCell key={cell.id} {...cell} />
        )
      )}
    </tr>
  );
}

export default Row;
