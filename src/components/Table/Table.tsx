/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import TableHeadings from './table-parts/TableHeadings/TablesHeadings';
import Row from './table-parts/Row/Row';
import { updateCell } from 'modules/editing';
import { availableModal, ICell, IColumn, IRow, ISorts, ITable } from 'types';
import styles from 'components/Table/Table.module.css';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
	onSort: Function;
	onSetActiveModal: (arg0: availableModal, column: IColumn) => void;
	onTableChange: Function;
	onRowAction: (action: string, row: IRow) => void;
	activeSorts: ISorts;
}

interface IState {
	/**
	 * The uuid of the cell that is currently being edited.
	 */
	activeCell?: string;
}

/**
 * A file that has been opened and is being displayed as a Table in the editor.
 */
class Table extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const { data } = props;

		this.state = {
			activeCell: data.firstCellId,
		};
	}

	/**
	 * Generates the heading component created from a sample row in the Table.
	 *
	 * @return A heading component created from a sample row in the Table.
	 */
	getHeaders() {
		return (
			<TableHeadings
				table={this.props.data}
				activeSorts={this.props.activeSorts}
				onSort={(columnID: string) => this.props.onSort(columnID)}
				onSetActiveModal={this.props.onSetActiveModal}
			/>
		);
	}

	/**
	 * Generates the thead for the Table.
	 *
	 * @return The Table's thead
	 */
	getHead() {
		const headings = this.getHeaders();
		return <thead>{headings}</thead>;
	}

	/**
	 * Generates the tfoot for the Table.
	 *
	 * @return The Table's tfoot
	 */
	getFoot() {
		const headings = this.getHeaders();
		return <tfoot>{headings}</tfoot>;
	}

	/**
	 * Handles the change of a value within a cell.
	 *
	 * @param  changedCell The new cell data.
	 */
	handleCellChange(changedCell: ICell) {
		const newData = updateCell(this.props.data, changedCell);
		this.props.onTableChange(newData);
	}

	handleActiveCellChange(e: React.MouseEvent) {
		const { target } = e;
		const { dataset } = target as HTMLElement;
		if (dataset && dataset.id) {
			this.setState({ activeCell: dataset.id });
		}
	}

	render() {
		const { data } = this.props;
		const { contents } = data;
		return (
			<div className={styles.container}>
				<table>
					{this.getHead()}
					<tbody onClick={(e) => this.handleActiveCellChange(e)}>
						{contents.map((row) => (
							<Row
								key={row.id}
								data={row}
								activeCell={this.state.activeCell}
								onCellChange={(e: ICell) =>
									this.handleCellChange(e)
								}
								onAction={(action: string) =>
									this.props.onRowAction(action, row)
								}
							/>
						))}
					</tbody>
					{this.getFoot()}
				</table>
			</div>
		);
	}
}

export default Table;
