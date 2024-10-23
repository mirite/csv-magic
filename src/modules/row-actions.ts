import type { Row, Table } from "types";

import { cloneDeep, createID } from "./tools";

/**
 * Deletes a row from a Table.
 *
 * @param data The Table to delete the row from.
 * @param row The row to delete.
 * @returns A new Table with the row removed.
 */
export function deleteRow(data: Table, row: Row): Table {
	const newData = cloneDeep(data);
	newData.contents = newData.contents.filter(
		(rowInTable) => rowInTable.id !== row.id,
	);
	return newData;
}

/**
 * Duplicates a row in a Table.
 *
 * @param data The Table to duplicate the row in.
 * @param row The row to duplicate.
 * @returns A new Table with the row duplicated.
 */
export function duplicateRow(data: Table, row: Row): Table {
	const newData = cloneDeep(data);
	const rowIndex = newData.contents.findIndex(
		(rowInTable) => rowInTable.id === row.id,
	);
	const newRow = cloneDeep(row);
	newRow.id = createID("row");
	for (const cell of newRow.contents) {
		const { columnID } = cell;
		cell.id = newRow.id + "," + columnID;
	}
	newData.contents.splice(rowIndex, 0, newRow);
	return newData;
}
