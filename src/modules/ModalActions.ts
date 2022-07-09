import AddColumnModal from 'components/modals/AddColumn/AddColumn';
import FiltersModal from 'components/modals/Filters/Filters';
import FindAndReplaceModal from 'components/modals/FindAndReplace/FindAndReplace';
import RemoveColumnsModal from 'components/modals/RemoveColumns/RemoveColumns';
import RenameColumnModal from 'components/modals/RenameColumn/RenameColumn';
import Filtering from 'modules/filtering';
import { findAndReplaceInColumn, removeColumns, renameColumn } from './editing';
import {
	EGeneratorTypes,
	IColumn,
	IFile,
	IFilter,
	IMappedColumn,
	IModalAction,
	ISorts,
	ITable,
} from 'types';
import { addColumn } from './column-generator';
import ReorderColumnsModal from 'components/modals/ReorderColumns/ReorderColumns';
import { reorderColumns } from './reordering';

interface IModalList {
	[key: string]: IModalAction;
}

export default class ModalActions {
	/**
	 * A list of modals that can be shown.
	 */
	readonly modals: IModalList;

	/**
	 * The state of the editor/parent, used for getting the Table data, filters, sorts, etc.
	 */
	editorState: IFile;

	/**
	 * The function to call to update the main (data and sorts) status of the Table.
	 */
	readonly setCoreState: (newData: ITable, newSorts: ISorts) => void;

	/**
	 *
	 * @param  coreStateSetter The function to call to update the main (data and sorts) status of the Table.
	 * @param  editorState     The state of the editor/parent, used for getting the Table data, filters, sorts, etc.
	 */
	constructor(
		coreStateSetter: (newData: ITable, newSorts: ISorts) => void,
		editorState: IFile
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
				onApply: (column: IColumn, toFind: string, toReplace: string) =>
					this.handleFindAndReplace(column, toFind, toReplace),
			},
			renameColumn: {
				ComponentToUse: RenameColumnModal,
				title: 'Rename Column',
				onApply: (column: IColumn, newName: string) =>
					this.handleRenameColumn(column, newName),
			},
			removeColumns: {
				ComponentToUse: RemoveColumnsModal,
				title: 'Remove Columns',
				onApply: (columns: IColumn[]) =>
					this.handleRemoveColumns(columns),
			},
			reorderColumns: {
				ComponentToUse: ReorderColumnsModal,
				title: 'Reorder Columns',
				onApply: (columnIDs: string[]) =>
					this.handleReorderColumns(columnIDs),
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
	handleReorderColumns(columnIDs: string[]) {
		const { table, activeSorts } = this.editorState;
		const newData = reorderColumns(table, columnIDs);
		this.setCoreState(newData, activeSorts);
	}

	updateEditorState(newState: IFile): void {
		this.editorState = newState;
	}

	handleAddColumn(
		newColumnName: string,
		method: EGeneratorTypes,
		params: string | string[] | IMappedColumn | undefined
	) {
		const { table, activeSorts } = this.editorState;

		const newData = addColumn(table, newColumnName, method, params);
		this.setCoreState(newData, activeSorts);
	}
	handleRemoveColumns(columns: IColumn[]) {
		const { table, activeSorts } = this.editorState;
		const newTable = removeColumns(table, columns);
		this.setCoreState(newTable, activeSorts);
	}

	/**
	 * Handles the application of a filter.
	 *
	 * @param  newFilter
	 */
	handleApplyFilters(newFilter: IFilter): void {
		const { table, activeSorts } = this.editorState;
		const newData = Filtering.applyFilters(table, newFilter);
		this.setCoreState(newData, activeSorts);
	}

	handleFindAndReplace(
		column: IColumn,
		toFind: string,
		toReplace: string
	): void {
		const { table, activeSorts } = this.editorState;
		const newTable = findAndReplaceInColumn(
			table,
			column,
			toFind,
			toReplace
		);
		this.setCoreState(newTable, activeSorts);
	}
	handleRenameColumn(column: IColumn, newName: string) {
		const { table, activeSorts } = this.editorState;
		const newTable = renameColumn(table, column.id, newName);
		this.setCoreState(newTable, activeSorts);
	}
}
