import React, { Component, Fragment } from 'react';
import Row from './table-parts/Row';
import Sorting from '../modules/sorting';
import Filters from './Filters';
import { ICell, ITable } from '../types';
import TableHeadings from './table-parts/TablesHeadings';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
}

interface IState {
	/**
	 * An array of the active filters applied with their key and value to show.
	 */
	activeFilters: Array<[string, string]>;

	/**
	 * An array of currently active sorting methods.
	 */
	activeSorts: Array<[string, boolean]>;

	/**
	 * The current data showing after filters, sorts, and edits have been applied.
	 */
	activeData: ITable;

	/**
	 * True indicates that a filter modal is being shown.
	 */
	filtersShowing: boolean;

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
			activeFilters: [],
			activeSorts: [],
			activeData: data,
			filtersShowing: false,
			activeCell: data.firstCellId,
		};
	}

	/**
	 * Handles the sorting on a key.
	 *
	 * @param  key The field to sort on.
	 */
	handleSort(key: string) {
		const { activeSorts, activeData } = this.state;

		/**
		 * Adds the new sort to the list of sorts if it isn't present or toggles direction/removes sort if it is already present.
		 */
		const newSorts = Sorting.setSort([...activeSorts], key);

		/**
		 * The updated data with sorting applied.
		 */
		const newData = Sorting.applySorting(activeData, newSorts);
		this.setState({ activeSorts: newSorts, activeData: newData });
	}

	/**
	 * Generates the heading component created from a sample row in the table.
	 *
	 * @return A heading component created from a sample row in the table.
	 */
	getHeaders() {
		const row = this.props.data[0];
		return (
			<TableHeadings
				exampleRow={row}
				activeSorts={this.state.activeSorts}
				onSort={(key: string) => this.handleSort(key)}
				onShowFilter={(key: string) => this.handleShowFilter(key)}
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
	 * Handles the application of a filter.
	 */
	handleApply(): void {
		throw new Error('Method not implemented.');
	}

	/**
	 * Handles the closing of the filter window.
	 */
	handleFilterClose(): void {
		this.setState({ filtersShowing: false });
	}

	/**
	 * Displays the filter modal if it is active.
	 */
	getModals() {
		if (this.state.filtersShowing) {
			return (
				<Filters
					title="Filter"
					onClose={() => this.handleFilterClose()}
					onApply={() => this.handleApply()}
				/>
			);
		}
	}

	/**
	 * Handles showing the filter window for the specified key.
	 *
	 * @param  key The key to filter on.
	 */
	handleShowFilter(key: string) {
		this.setState({ filtersShowing: true });
	}

	/**
	 * Handles the change of a value within a cell.
	 *
	 * @param  e The new cell data.
	 */
	handleCellChange(e: ICell) {
		throw new Error('Method not implemented.');
	}

	render() {
		const { activeData } = this.state;
		return (
			<Fragment>
				<table>
					{this.getHead()}
					<tbody>
						{activeData.map((row) => (
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
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Table;
