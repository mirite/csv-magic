import React, { Component } from 'react';
import { ICell, IRow } from '../../../types';
import ActiveCell from './ActiveCell';
import Cell from './Cell';

interface IProps {
	/**
	 * The data to use for the row.
	 */
	data: IRow;

	/**
	 * Handler for when the data in a cell is changed.
	 */
	onCellChange: (arg0: ICell) => any;

	/**
	 * The ID of the active cell within the table (if there is one)
	 */
	activeCell?: string;
}

/**
 * Displays a row of cells within a table.
 */
class Row extends Component<IProps> {
	renderNormalRow() {
		const { contents } = this.props.data;
		return contents.map((cell) => {
			return <Cell key={cell.id} data={cell} />;
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
						data={cell}
						onCellChange={(e: ICell) => onCellChange(e)}
					/>
				);
			}
			return <Cell key={cell.id} data={cell} />;
		});
	}

	isActiveCellInRow() {
		const { activeCell, data } = this.props;
		if (!activeCell || !data.id) return false;
		return activeCell.includes(data.id);
	}

	render() {
		let elems;
		if (this.isActiveCellInRow()) {
			elems = this.renderRowWithActiveCell();
		} else {
			elems = this.renderNormalRow();
		}
		return <tr>{elems}</tr>;
	}
}

export default Row;
