import React, { ChangeEvent } from 'react';
import Cell, { IProps } from './Cell';
import styles from 'styles/table/table-parts/Cell.module.css';

/**
 * A table cell that is currently selected. This changes the text label into an input for editing.
 */
class ActiveCell extends Cell {
	constructor(props: IProps) {
		super(props);
		this.state = { value: this.props.data.value };
	}

	/**
	 * Update the input state if the outside cell props were changed.
	 *
	 * @param  prevProps The previous props object.
	 */
	componentDidUpdate(prevProps: IProps) {
		if (this.props !== prevProps) {
			this.setState({ value: this.props.data.value });
		}
	}

	componentWillUnmount() {
		const { id, columnID: key, value: initValue } = this.props.data;
		const { value } = this.state;
		//Call the parent event handler if one was set. and if the cell was actually changed.
		if (value === initValue || !this.props.onCellChange) {
			return;
		}
		this.props.onCellChange({ id, columnID: key, value });
	}

	/**
	 * Handles the change event in the cell input field.
	 *
	 * @param  e The input change event.
	 */
	handleChange(e: ChangeEvent) {
		/**
		 * The new value from the input.
		 */
		const newValue = (e.currentTarget as HTMLInputElement).value;
		this.setState({ value: newValue });
	}

	render() {
		const { value } = this.state;
		const rowCount = value.split('\\n').length;
		return (
			<td className={styles.container}>
				<textarea
					className={styles.input}
					onChange={(e) => this.handleChange(e)}
					rows={rowCount}
					value={value}
				/>
			</td>
		);
	}
}

export default ActiveCell;
