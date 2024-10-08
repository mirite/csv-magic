import type { Row, Table } from "types";

import { cloneDeep, createID } from "./tools";

/**
 * @param data
 * @param row
 */
export function deleteRow(data: Table, row: Row): Table {
	const newData = cloneDeep(data);
	newData.contents = newData.contents.filter(
		(rowInTable) => rowInTable.id !== row.id,
	);
	return newData;
}

/**
 * @param data
 * @param row
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
