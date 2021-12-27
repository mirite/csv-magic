import React, { Component } from 'react';
import { IRow } from '../types';
import ActiveCell from './ActiveCell';
import Cell from './Cell';

interface IProps {
	/**
	 * The data to use for the row.
	 */
	data: IRow;

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
	 * @returns 
	 */
	generateRow(): Array<JSX.Element> {
		const {data, activeCell} = this.props;
		const cells = [];
		for (const cell of data) {
			const { id } = cell;
			if (id === activeCell) {
				cells.push(<ActiveCell key={id} data={cell} />);
			} else {
				cells.push(<Cell key={id} data={cell} />);
			}
		}
		return cells;
	}
	render() {
		return (
			<tr key={this.props.data.id}>
				{this.generateRow()}
			</tr>
		);
	}
}

export default Row;