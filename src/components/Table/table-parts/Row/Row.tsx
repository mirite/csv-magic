import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import ActiveCell from '../Cell/ActiveCell/ActiveCell';
import { ICell, IRow } from '../../../../types';
import RowHeading from './RowHeading/RowHeading';

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
	 * The ID of the active cell within the Table (if there is one)
	 */
	activeCell?: string;

	onAction: (action: string) => void;
}

/**
 * Displays a row of cells within a Table.
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
		if (!activeCell || !data.id) {
			return false;
		}
		return activeCell.includes(data.id);
	}

	getTH() {
		return (
			<RowHeading
				row={this.props.data}
				onAction={(action: string) => this.props.onAction(action)}
			/>
		);
	}

	render() {
		let elems;
		if (this.isActiveCellInRow()) {
			elems = this.renderRowWithActiveCell();
		} else {
			elems = this.renderNormalRow();
		}
		return (
			<tr>
				{this.getTH()}
				{elems}
			</tr>
		);
	}
}

export default Row;
