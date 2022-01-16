import _ from 'lodash';
import { getCellByID, getColumnIndex } from './access-helpers';
import { ICell, IColumn, IRow, ITable } from 'types';

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
 * @param  data          The table to rename the column in.
 * @param  columnId      The name of the column to change.
 * @param  newColumnName What to change the name to.
 * @return A new table with the column renamed.
 */
export function renameColumn(
	data: ITable,
	columnId: string,
	newColumnName: string
): ITable {
	const newData = _.cloneDeep(data);
	const column = newData.columns.find((c) => c.id === columnId);
	if (!column) throw new Error('Column ID not found');
	column.label = newColumnName;
	return newData;
}

/**
 * Finds a string within a column and replaces it with the new value.
 *
 * @param  data          The table to find and replace in.
 * @param  column        The name of the column to find and replace in.
 * @param  toFind        The string value to search for.
 * @param  toReplaceWith The string value to replace with.
 */
export function findAndReplaceInColumn(
	data: ITable,
	column: IColumn,
	toFind: string,
	toReplaceWith: string
): ITable {
	const newData = _.cloneDeep(data);
	const columnIndex = getColumnIndex(newData, column.id);

	for (const row of newData.contents) {
		const cell = row.contents[columnIndex];
		cell.value = cell.value.replace(toFind, toReplaceWith);
	}
	return newData;
}

function removeColumnsInRow(row: IRow, columnIdsToRemove: string[]): IRow {
	const remainingCells = row.contents.filter(
		(cell) => !columnIdsToRemove.includes(cell.columnID)
	);
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
 * @param  columnsToRemove An array of the columns to remove by id.
 * @return A new table with the columns removed.
 */
export function removeColumns(
	data: ITable,
	columnsToRemove: IColumn[]
): ITable {
	const newData = _.cloneDeep(data);
	const idsOfColumnsToRemove = columnsToRemove.map((c) => c.id);

	newData.columns = newData.columns.filter(
		(c) => !idsOfColumnsToRemove.includes(c.id)
	);

	newData.contents = newData.contents.map((row) =>
		removeColumnsInRow(row, idsOfColumnsToRemove)
	);
	return newData;
}
