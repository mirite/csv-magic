import React from "react";
import ActiveCell from "../Cell/ActiveCell/ActiveCell";
import { Cell, Row } from "types";
import RowHeading from "../TableHeadings/TableHeading/RowHeading/RowHeading";
import InactiveCell from "../Cell/InactiveCell";
import { RowAction } from "../../../Editor/Editor";

interface IProps {
  /**
   * Handler for when the data in a cell is changed.
   */
  onCellChange: (cell: Cell, newValue: string) => void;

  /**
   * The ID of the active cell within the Table (if there is one)
   */
  activeCell?: string;

  onAction: (row: Row, action: RowAction) => void;
  data: Row;
}

/**
 * Displays a row of cells within a Table.
 * @param props The table row data.
 * @returns A table row.
 */
function Row(props: IProps) {
  const { activeCell, onCellChange, onAction, data } = props;
  return (
    <tr>
      <RowHeading onAction={(action) => onAction(data, action)} />
      {data.contents.map((cell) =>
        activeCell === cell.id ? (
          <ActiveCell
            key={cell.id}
            onChange={(newValue) => onCellChange(cell, newValue)}
            {...cell}
          />
        ) : (
          <InactiveCell key={cell.id} {...cell} />
        ),
      )}
    </tr>
  );
}

export default Row;
