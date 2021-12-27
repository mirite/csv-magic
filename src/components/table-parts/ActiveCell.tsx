import React, { ChangeEvent, Component } from 'react';
import Cell, { IProps } from './Cell';
import styles from '../../styles/Cell.module.css';

/**
 * A table cell that is currently selected. This changes the text label into an input for editing.
 */
class ActiveCell extends Cell {
	constructor(props: IProps) {
		super(props);
		this.state = { value: this.props.data.value };
	}

	componentDidUpdate(prevProps: IProps) {
		if (this.props !== prevProps) {
			this.setState({ value: this.props.data.value });
		}
	}

	update(e: ChangeEvent) {
		const newValue = (e.currentTarget as HTMLInputElement).value;
		this.setState({ value: newValue });
	}

	render() {
		return (
			<td className={styles.container}>
				<input
					type="text"
					className={styles.input}
					value={this.state.value}
					onChange={(e) => this.update(e)}
				/>
			</td>
		);
	}
}

export default ActiveCell;
