import React, { Component } from 'react';
import { ICell } from '../../types';
import styles from '../../styles/Cell.module.css';

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
 * A single cell within a table.
 */
class Cell extends Component<IProps, IState> {
	render() {
		return (
			<td className={styles.container}>
				<span className={styles.label}>{this.props.data.value}</span>
			</td>
		);
	}
}

export default Cell;
