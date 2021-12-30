/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import Chrome from './chrome/Chrome';
import Table from './table/Table';
import FiltersModal from './modals/Filters';
import FindAndReplaceModal from './modals/FindAndReplace';
import Sorting from 'modules/sorting';
import Filtering from 'modules/filtering';
import { findAndReplaceInColumn, renameColumn } from 'modules/editing';
import { IEditorState, IFilter, IModalAction, ITable } from 'types';
import RenameColumnModal from './modals/RenameColumn';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
}

interface IModalList {
	[key: string]: IModalAction;
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
 */
class Editor extends Component<IProps, IEditorState> {
	modals: IModalList;

	constructor(props: IProps) {
		super(props);
		const { data } = props;

		this.modals = {
			filter: {
				ComponentToUse: FiltersModal,
				title: 'Filter',
				onApply: (newFilter: IFilter) =>
					this.handleApplyFilters(newFilter),
			},
			findAndReplace: {
				ComponentToUse: FindAndReplaceModal,
				title: 'Find and Replace In Column',
				onApply: (column: string, toFind: string, toReplace: string) =>
					this.handleFindAndReplace(column, toFind, toReplace),
			},
			renameColumn: {
				ComponentToUse: RenameColumnModal,
				title: 'Rename Column',
				onApply: (column: string, newName: string) =>
					this.handleRenameColumn(column, newName),
			},
		};

		this.state = {
			activeFilters: [],
			activeSorts: [],
			activeData: data,
			activeModal: undefined,
			history: [],
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
		this.setCoreState(newData, newSorts);
	}

	/**
	 * Handles the application of a filter.
	 *
	 * @param  newFilters
	 */
	handleApplyFilters(newFilters: IFilter): void {
		const { activeData, activeFilters, activeSorts } = this.state;
		const newFilterState = [...activeFilters, newFilters];
		const newData = Filtering.applyFilters(activeData, newFilterState);
		this.setState({ activeFilters: newFilterState });
		this.setCoreState(newData, activeSorts);
	}

	handleFindAndReplace(
		column: string,
		toFind: string,
		toReplace: string
	): void {
		const { activeData, activeSorts } = this.state;
		const newTable = findAndReplaceInColumn(
			activeData,
			column,
			toFind,
			toReplace
		);
		this.setCoreState(newTable, activeSorts);
	}
	handleRenameColumn(column: string, newName: string) {
		const { activeData, activeSorts } = this.state;
		const newTable = renameColumn(activeData, column, newName);
		this.setCoreState(newTable, activeSorts);
	}
	/**
	 * Handles the closing of the filter window.
	 */
	handleModalClose(): void {
		this.setState({ activeModal: undefined });
	}

	/**
	 * Displays the filter modal if it is active.
	 */
	getModals() {
		const { activeModal, activeData } = this.state;
		if (!activeModal) return;
		const { column, action } = activeModal;
		const { ComponentToUse, title, onApply } = action;

		return (
			<ComponentToUse
				title={title}
				column={column}
				table={activeData}
				onClose={() => this.handleModalClose()}
				onApply={(...args: any) => onApply(...args)}
			/>
		);
	}

	/**
	 * Handles showing the filter window for the specified key.
	 *
	 * @param  modalName The modal to display.
	 * @param  column    The key to run the modal on.
	 */
	handleSetActiveModal(modalName: string, column: string) {
		const action = this.modals[modalName];
		if (!action) throw new Error(`Invalid modal requested "${modalName}"`);
		this.setState({ activeModal: { column, action } });
	}

	/**
	 * Handles the change of a value within a table.
	 *
	 * @param  changedTable The new table data.
	 */
	handleTableChange(changedTable: ITable) {
		const { activeSorts } = this.state;
		this.setCoreState(changedTable, activeSorts);
	}

	setCoreState(newData: ITable, newSorts: Array<[string, boolean]>) {
		const { history, activeData, activeSorts } = this.state;
		const newHistoryEntry = {
			activeData,
			activeSorts,
			timestamp: Date.now(),
		};
		const newHistory = [...history, newHistoryEntry];
		this.setState({
			activeData: newData,
			activeSorts: newSorts,
			history: newHistory,
		});
	}

	render() {
		const { activeData, activeSorts } = this.state;
		return (
			<Fragment>
				<Chrome
					editorState={this.state}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
				/>
				<Table
					data={activeData}
					onSort={(e: string) => this.handleSort(e)}
					oneSetActiveModal={(modal, column) =>
						this.handleSetActiveModal(modal, column)
					}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					activeSorts={activeSorts}
				/>
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Editor;
