/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import Row from './table-parts/Row';
import { ICell, ITable } from '../../types';
import TableHeadings from './table-parts/TablesHeadings';
import { updateCell } from '../../modules/editing';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
	onSort: Function;
	onShowFilter: Function;
	onTableChange: Function;
	activeSorts: Array<[string, boolean]>;
}

interface IState {
	/**
	 * The uuid of the cell that is currently being edited.
	 */
	activeCell?: string;
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
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
	 * Generates the heading component created from a sample row in the table.
	 *
	 * @return A heading component created from a sample row in the table.
	 */
	getHeaders() {
		return (
			<TableHeadings
				table={this.props.data}
				activeSorts={this.props.activeSorts}
				onSort={(key: string) => this.props.onSort(key)}
				onShowFilter={(key: string) => this.props.onShowFilter(key)}
			/>
		);
	}

	/**
	 * Generates the thead for the table.
	 *
	 * @return The table's thead
	 */
	getHead() {
		const headings = this.getHeaders();
		return <thead>{headings}</thead>;
	}

	/**
	 * Generates the tfoot for the table.
	 *
	 * @return The table's tfoot
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
			<Fragment>
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
							/>
						))}
					</tbody>
					{this.getFoot()}
				</table>
			</Fragment>
		);
	}
}

export default Table;
