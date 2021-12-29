/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import Sorting from './../modules/sorting';
import Filtering from './../modules/filtering';
import FiltersModal from './FiltersModal';
import { IFilter, ITable } from '../types';
import Chrome from './chrome/Chrome';
import Table from './table/Table';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
}

export interface IEditorState {
	/**
	 * An array of the active filters applied with their key and value to show.
	 */
	activeFilters: Array<IFilter>;

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
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
 */
class Editor extends Component<IProps, IEditorState> {
	constructor(props: IProps) {
		super(props);
		const { data } = props;

		this.state = {
			activeFilters: [],
			activeSorts: [],
			activeData: data,
			filtersShowing: '',
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
	 * Handles the application of a filter.
	 *
	 * @param  newFilters
	 */
	handleApplyFilters(newFilters: IFilter): void {
		const { activeData, activeFilters } = this.state;
		const newFilterState = [...activeFilters, newFilters];
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
			return (
				<FiltersModal
					title="Filter"
					onClose={() => this.handleFilterClose()}
					onApply={(newFilter) => this.handleApplyFilters(newFilter)}
					table={this.state.activeData}
					column={filtersShowing}
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
	 * Handles the change of a value within a table.
	 *
	 * @param  changedTable The new table data.
	 */
	handleTableChange(changedTable: ITable) {
		this.setState({ activeData: changedTable });
	}

	render() {
		const { activeData, activeSorts } = this.state;
		return (
			<Fragment>
				<Chrome editorState={this.state} />
				<Table
					data={activeData}
					onSort={(e: string) => this.handleSort(e)}
					onShowFilter={(e: string) => this.handleShowFilter(e)}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					activeSorts={activeSorts}
				/>
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Editor;
