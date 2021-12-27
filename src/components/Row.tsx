import React, { Component } from 'react';
import { IRow } from '../types';
import ActiveCell from './ActiveCell';
import Cell from './Cell';

interface IProps {
	data: IRow;
	activeCell?: string;
}

export function getCellValue(row: IRow, key: string):string {
	const foundCell = row.find(cell => cell.key === key);
	if (foundCell) return foundCell.value;
	return '';
}

class Row extends Component<IProps> {

	generateRow() {
		const cells = [];
		for (const cell of this.props.data) {
			if (cell.id === this.props.activeCell) {
				cells.push(<ActiveCell key={cell.id} data={cell} />);
			} else {
				cells.push(<Cell key={cell.id} data={cell} />);
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