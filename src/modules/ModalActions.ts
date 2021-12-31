import { OpenFilesContext } from 'components/ViewContainer';
import AddColumnModal from 'components/modals/AddColumn';
import FiltersModal from 'components/modals/Filters';
import FindAndReplaceModal from 'components/modals/FindAndReplace';
import RemoveColumnsModal from 'components/modals/RemoveColumns';
import RenameColumnModal from 'components/modals/RenameColumn';
import Filtering from 'modules/filtering';
import { findAndReplaceInColumn, removeColumns, renameColumn } from './editing';
import {
	EGeneratorTypes,
	IEditorState,
	IEditorStateAndTable,
	IFilter,
	IMappedColumn,
	IModalAction,
	ITable,
} from 'types';
import { addColumn } from './column-generator';

interface IModalList {
	[key: string]: IModalAction;
}

export default class ModalActions {
	/**
	 * A list of modals that can be shown.
	 */
	readonly modals: IModalList;

	/**
	 * The state of the editor/parent, used for getting the table data, filters, sorts, etc.
	 */
	editorState: IEditorStateAndTable;

	/**
	 * The function to call to update the main (data and sorts) status of the table.
	 */
	readonly setCoreState: (
		newData: ITable,
		newSorts: Array<[string, boolean]>
	) => void;

	/**
	 *
	 * @param  coreStateSetter The function to call to update the main (data and sorts) status of the table.
	 * @param  editorState     The state of the editor/parent, used for getting the table data, filters, sorts, etc.
	 */
	constructor(
		coreStateSetter: (
			newData: ITable,
			newSorts: Array<[string, boolean]>
		) => void,
		editorState: IEditorStateAndTable
	) {
		//Assignments from constructor.
		this.setCoreState = coreStateSetter;
		this.editorState = editorState;

		//Set the modal list.
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
			removeColumns: {
				ComponentToUse: RemoveColumnsModal,
				title: 'Remove Columns',
				onApply: (columns: string[]) =>
					this.handleRemoveColumns(columns),
			},
			addColumn: {
				ComponentToUse: AddColumnModal,
				title: 'Add Column',
				onApply: (
					columnName: string,
					method: EGeneratorTypes,
					params?: string | string[] | IMappedColumn
				) => this.handleAddColumn(columnName, method, params),
			},
		};
	}

	updateEditorState(newState: IEditorStateAndTable): void {
		this.editorState = newState;
	}

	handleAddColumn(
		columnName: string,
		method: EGeneratorTypes,
		params: string | string[] | IMappedColumn | undefined
	) {
		const { activeData, activeSorts } = this.editorState;

		const newData = addColumn(activeData, columnName, method, params);
		this.setCoreState(newData, activeSorts);
	}
	handleRemoveColumns(columns: string[]) {
		const { activeData, activeSorts } = this.editorState;
		const newTable = removeColumns(activeData, columns);
		this.setCoreState(newTable, activeSorts);
	}

	/**
	 * Handles the application of a filter.
	 *
	 * @param  newFilter
	 */
	handleApplyFilters(newFilter: IFilter): void {
		const { activeData, activeSorts } = this.editorState;
		const newData = Filtering.applyFilters(activeData, newFilter);
		this.setCoreState(newData, activeSorts);
	}

	handleFindAndReplace(
		column: string,
		toFind: string,
		toReplace: string
	): void {
		const { activeData, activeSorts } = this.editorState;
		const newTable = findAndReplaceInColumn(
			activeData,
			column,
			toFind,
			toReplace
		);
		this.setCoreState(newTable, activeSorts);
	}
	handleRenameColumn(column: string, newName: string) {
		const { activeData, activeSorts } = this.editorState;
		const newTable = renameColumn(activeData, column, newName);
		this.setCoreState(newTable, activeSorts);
	}
}
