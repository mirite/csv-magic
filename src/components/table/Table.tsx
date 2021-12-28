/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import Row from './table-parts/Row';
import Sorting from '../../modules/sorting';
import Filtering from '../../modules/filtering';
import FiltersModal from './FiltersModal';
import { ICell, ITable } from '../../types';
import TableHeadings from './table-parts/TablesHeadings';
import { updateCell } from '../../modules/editing';
import CSVSaver from '../../modules/csv-saver';

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
	 * The current data showing after filters, sorts have been applied.
	 */
	activeData: ITable;

	/**
	 * A column name indicates that a filter modal is being shown for that column.
	 */
	filtersShowing: string;

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
			filtersShowing: '',
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
		return (
			<TableHeadings
				table={this.state.activeData}
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
	 *
	 * @param  newFilters
	 */
	handleApplyFilters(newFilters: Array<[string, string]>): void {
		const { activeData, activeFilters } = this.state;
		const newFilterState = [...activeFilters, ...newFilters];
		const newData = Filtering.applyFilters(activeData, newFilterState);
		this.setState({ activeFilters: newFilterState, activeData: newData });
	}

	/**
	 * Handles the closing of the filter window.
	 */
	handleFilterClose(): void {
		this.setState({ filtersShowing: '' });
	}

	/**
	 * Displays the filter modal if it is active.
	 */
	getModals() {
		const { filtersShowing } = this.state;
		if (filtersShowing) {
			const filtersOnColumn = this.state.activeFilters.filter(
				(item) => item[0] === filtersShowing
			);

			return (
				<FiltersModal
					title="Filter"
					onClose={() => this.handleFilterClose()}
					onApply={(newFilters) =>
						this.handleApplyFilters(newFilters)
					}
					table={this.state.activeData}
					column={filtersShowing}
					activeFilters={filtersOnColumn}
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
		this.setState({ filtersShowing: key });
	}

	/**
	 * Handles the change of a value within a cell.
	 *
	 * @param  changedCell The new cell data.
	 */
	handleCellChange(changedCell: ICell) {
		const newData = updateCell(this.state.activeData, changedCell);
		this.setState({ activeData: newData });
	}

	handleActiveCellChange(e: React.MouseEvent) {
		const { target } = e;
		const { dataset } = target as HTMLElement;
		if (dataset && dataset.id) {
			this.setState({ activeCell: dataset.id });
		}
	}

	saveTable() {
		CSVSaver(this.state.activeData);
	}

	render() {
		const { activeData } = this.state;
		const { contents } = activeData;
		return (
			<Fragment>
				<div>
					<button type="button" onClick={() => this.saveTable()}>
						Save As
					</button>
				</div>
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
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Table;
