import _ from 'lodash';
import {
	getCellByID,
	getColumnIndex,
	getRowWithMatchingValueInColumn,
} from './access-helpers';
import { EGeneratorTypes, ICell, IMappedColumn, IRow, ITable } from 'types';

/**
 * Updates a cell within a table.
 *
 * @param  data The table to update the cell in.
 * @param  cell The new version of the cell to add to the table.
 * @return A new table with the cell changed.
 */
export function updateCell(data: ITable, cell: ICell): ITable {
	const newData = _.cloneDeep(data);
	const cellToUpdate = getCellByID(newData, cell.id);
	if (cellToUpdate) cellToUpdate.value = cell.value;
	return newData;
}

/**
 * Renames a column throughout a table.
 *
 * @param  data               The table to rename the column in.
 * @param  originalColumnName The name of the column to change.
 * @param  newColumnName      What to change the name to.
 * @return A new table with the column renamed.
 */
export function renameColumn(
	data: ITable,
	originalColumnName: string,
	newColumnName: string
): ITable {
	const newData = _.cloneDeep(data);
	const columnIndex = getColumnIndex(newData, originalColumnName);
	newData.contents.forEach((row) =>
		renameColumnInRow(row, newColumnName, columnIndex)
	);
	return newData;
}

function renameColumnInRow(
	row: IRow,
	newColumnName: string,
	columnIndex: number
): void {
	renameColumnInCell(row.contents[columnIndex], newColumnName);
}

function renameColumnInCell(cell: ICell, newColumnName: string) {
	cell.key = newColumnName;
}

/**
 * Finds a string within a column and replaces it with the new value.
 *
 * @param  data          The table to find and replace in.
 * @param  columnName    The name of the column to find and replace in.
 * @param  toFind        The string value to search for.
 * @param  toReplaceWith The string value to replace with.
 */
export function findAndReplaceInColumn(
	data: ITable,
	columnName: string,
	toFind: string,
	toReplaceWith: string
): ITable {
	const newData = _.cloneDeep(data);
	const columnIndex = getColumnIndex(newData, columnName);

	for (const row of newData.contents) {
		const cell = row.contents[columnIndex];
		cell.value = cell.value.replace(toFind, toReplaceWith);
	}
	return newData;
}

function removeColumnsInRow(row: IRow, indices: number[]): IRow {
	for (const index of indices) {
		delete row.contents[index];
	}
	const remainingCells = row.contents.filter((cell) => cell);
	return {
		id: row.id,
		originalIndex: row.originalIndex,
		contents: remainingCells,
	};
}
/**
 * Removes columns from the table.
 *
 * @param  data            The table to rename the column in.
 * @param  columnsToRemove An array of the columns to remove by name.
 * @return A new table with the columns removed.
 */
export function removeColumns(data: ITable, columnsToRemove: string[]): ITable {
	const newData = _.cloneDeep(data);
	const columnIndices = columnsToRemove.map((label) =>
		getColumnIndex(newData, label)
	);

	newData.contents = newData.contents.map((row) =>
		removeColumnsInRow(row, columnIndices)
	);
	return newData;
}
