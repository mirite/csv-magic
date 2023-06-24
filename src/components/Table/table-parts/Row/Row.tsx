import React, { Component } from "react";
import Cell from "../Cell/Cell";
import ActiveCell from "../Cell/ActiveCell/ActiveCell";
import { ICell, IRow } from "types";
import RowHeading from "../TableHeadings/TableHeading/RowHeading/RowHeading";
import InactiveCell from '../Cell/InactiveCell';

interface IProps {
  /**
   * The data to use for the row.
   */
  data: IRow;

  /**
   * Handler for when the data in a cell is changed.
   */
  onCellChange: (arg0: ICell, newValue: string) => void;

  /**
   * The ID of the active cell within the Table (if there is one)
   */
  activeCell?: string;

  onAction: (action: string) => void;
}

/**
 * Displays a row of cells within a Table.
 */
class Row extends Component<IProps> {
  renderNormalRow() {
    const { contents } = this.props.data;
    return contents.map((cell) => {
      return <InactiveCell key={cell.id} {...cell} />;
    });
  }

  renderRowWithActiveCell() {
    const { contents } = this.props.data;
    const { activeCell, onCellChange } = this.props;
    return contents.map((cell) => {
      if (cell.id === activeCell) {
        return (
          <ActiveCell
            key={cell.id}
            {...cell}
            onChange={(newValue) => onCellChange(cell, newValue)}
          />
        );
      }
      return <InactiveCell key={cell.id} {...cell} />;
    });
  }

  isActiveCellInRow() {
    const { activeCell, data } = this.props;
    if (!activeCell || !data.id) {
      return false;
    }
    return activeCell.includes(data.id);
  }

  render() {
    let elems;
    if (this.isActiveCellInRow()) {
      elems = this.renderRowWithActiveCell();
    } else {
      elems = this.renderNormalRow();
    }
    return (
      <tr>
        <RowHeading
            row={this.props.data}
            onAction={(action: string) => this.props.onAction(action)}
        />
        {elems}
      </tr>
    );
  }
}

export default Row;
