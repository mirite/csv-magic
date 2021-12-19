import React, { Component, Fragment as tr } from 'react';
import Cell from './Cell';

export interface IRow {
	[key: string]: string | boolean | number;
}

interface IProps {
	data: IRow;
}

class Row extends Component<IProps> {

	generateRow() {
		const cells = [];
		for (const [index, value] of Object.entries(this.props.data)) {
			cells.push(<Cell key={index} value={String(value)} />);
		}
		return cells;
	}
	render() {
		return (
			<tr>
				{this.generateRow()}
			</tr>
		);
	}
}

export default Row;