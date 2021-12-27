import React, { Component } from 'react';
import { ICell } from '../../types';
import styles from '../../styles/Cell.module.css';

export interface IProps {
	data: ICell;
}

export interface IState {
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
