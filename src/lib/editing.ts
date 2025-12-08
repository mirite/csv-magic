import type { Cell, Column, Row, Table } from "@/types.js";

import { getCellByID, getColumnIndex, cloneDeep } from "@/lib/index.js";

/**
 * Finds a string within a column and replaces it with the new value.
 *
 * @param data The Table to find and replace in.
 * @param column The name of the column to find and replace in.
 * @param toFind The string value to search for.
 * @param toReplaceWith The string value to replace with.
 * @returns A new Table with the values replaced.
 */
export function findAndReplaceInColumn(
	data: Table,
	column: Column,
	toFind: string,
	toReplaceWith: string,
): Table {
	const newData = cloneDeep(data);
	const columnIndex = getColumnIndex(newData, column.id);

	for (const row of newData.contents) {
		const cell = row.contents[columnIndex];
		cell.value = cell.value.replace(toFind, toReplaceWith);
	}
	return newData;
}

/**
 * Removes columns from the Table.
 *
 * @param data The Table to rename the column in.
 * @param columnsToRemove An array of the columns to remove by id.
 * @returns A new Table with the columns removed.
 */
export function removeColumns(data: Table, columnsToRemove: Column[]): Table {
	const newData = cloneDeep(data);
	const idsOfColumnsToRemove = columnsToRemove.map((c) => c.id);

	newData.columns = newData.columns.filter(
		(c) => !idsOfColumnsToRemove.includes(c.id),
	);

	newData.contents = newData.contents.map((row) =>
		removeColumnsInRow(row, idsOfColumnsToRemove),
	);
	return newData;
}

/**
 * Renames a column throughout a Table.
 *
 * @param data The Table to rename the column in.
 * @param columnId The name of the column to change.
 * @param newColumnName What to change the name to.
 * @returns A new Table with the column renamed.
 * @throws Error If the column ID is not found.
 */
export function renameColumn(
	data: Table,
	columnId: number,
	newColumnName: string,
): Table {
	const newData = cloneDeep(data);
	const column = newData.columns.find((c) => c.id === columnId);
	if (!column) {
		throw new Error("Column ID not found");
	}
	column.label = newColumnName;
	return newData;
}

/**
 * Updates a cell within a Table.
 *
 * @param data The Table to update the cell in.
 * @param cell The new version of the cell to add to the Table.
 * @returns A new Table with the cell changed.
 */
export function updateCell(data: Table, cell: Cell): Table {
	const newData = cloneDeep(data);
	const cellToUpdate = getCellByID(newData, cell.id);
	if (cellToUpdate) {
		cellToUpdate.value = cell.value;
	}
	return newData;
}
/**
 * Removes specified columns from a row.
 *
 * @param row The row to remove columns from.
 * @param columnIdsToRemove The IDs of the columns to remove.
 * @returns A new row with the columns removed.
 */
function removeColumnsInRow(row: Row, columnIdsToRemove: number[]): Row {
	const remainingCells = row.contents.filter(
		(cell) => !columnIdsToRemove.includes(cell.columnID),
	);
	return {
		contents: remainingCells,
		id: row.id,
		originalIndex: row.originalIndex,
	};
}
