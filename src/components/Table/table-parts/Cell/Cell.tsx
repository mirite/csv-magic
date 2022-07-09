import React, { Component } from 'react';
import { ICell } from 'types';
import styles from './Cell.module.css';

export interface IProps {
	/**
	 * The id, key, and value of the cell.
	 */
	data: ICell;

	/**
	 * The event handler to call if the value of the cell changes.
	 */
	onCellChange?: (event: ICell) => any;
}

export interface IState {
	/**
	 * The current text value of the cell.
	 */
	value: string;
}

/**
 * A single cell within a Table.
 */
class Cell extends Component<IProps, IState> {
	render() {
		const { value, id } = this.props.data;
		return (
			<td className={styles.container} data-id={id}>
				<span data-id={id}>{value}</span>
			</td>
		);
	}
}

export default Cell;
