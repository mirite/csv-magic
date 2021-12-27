import React, { Component } from 'react';
import { ICell, IRow } from '../../types';
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
	/**
	 * Renders out the inner array of Cells and returns it.
	 *
	 * @return an array of cells.
	 */
	generateInnerCells(): Array<JSX.Element> {
		const { data, activeCell, onCellChange } = this.props;

		/**
		 * An array of the cell components that make up the row.
		 */
		const cells = [];
		for (const cell of data) {
			const { id } = cell;

			//If the id of one of our cells matches the active cell id, render it as that component instead.
			if (id === activeCell) {
				cells.push(
					<ActiveCell
						key={id}
						data={cell}
						onCellChange={(e: ICell) => onCellChange(e)}
					/>
				);
			} else {
				cells.push(<Cell key={id} data={cell} />);
			}
		}
		return cells;
	}
	render() {
		return <tr key={this.props.data.id}>{this.generateInnerCells()}</tr>;
	}
}

export default Row;
