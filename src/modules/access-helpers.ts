import type { Cell, Row, Table } from "types";

/**
 * Counts the number of occurrences of a string in a column.
 *
 * @param data The Table to search in.
 * @param columnID The id of the column to search in.
 * @param needle The string to search for.
 * @returns The number of times the string was found.
 */
export function countOccurrences(
	data: Table,
	columnID: number,
	needle: string,
): number {
	const columnIndex = getColumnIndex(data, columnID);
	let count = 0;
	for (const row of data.contents) {
		if (row.contents[columnIndex].value.includes(needle)) {
			count++;
		}
	}
	return count;
}

/**
 * Finds a specified cell by id within a Table.
 *
 * @param table The Table tto to search in.
 * @param id The ID of the cell to find.
 * @returns The cell at the specified id.
 * @throws Error If the cell ID is not found.
 */
export function getCellByID(table: Table, id: string): Cell | undefined {
	const ids = id.split(",");
	const rowId = Number.parseInt(ids[0]);
	const columnId = Number.parseInt(ids[1]);
	if (!columnId || !rowId) {
		throw new Error("Bad Cell Id Provided");
	}
	const cellIndex = getColumnIndex(table, columnId);
	const foundRow = table.contents.find((row) => row.id === rowId);
	return foundRow?.contents[cellIndex];
}

/**
 * Takes a row and returns the value at the specified key.
 *
 * @param row The row to search for the cell in,
 * @param columnId The key of the value to find.
 * @returns The value at the specified key. Blank if the key was not present.
 */
export function getCellValueByColumnID(row: Row, columnId: number): string {
	const foundCell = row.contents.find((cell) => cell.columnID === columnId);
	if (foundCell) {
		return foundCell.value;
	}
	return "";
}

/**
 * Returns the index within a row that corresponds to the column name provided.
 *
 * @param data The Table to search in.
 * @param columnId The id of the column to find.
 * @returns The 0-based index within a row that corresponds to the column name,
 *   -1 if the column was not found.
 */
export function getColumnIndex(data: Table, columnId: number): number {
	const { columns } = data;
	const column = columns.find((c) => c.id === columnId);
	if (column) {
		return column.position;
	}
	return -1;
}

/**
 * Gets the column name by the column ID.
 *
 * @param table The Table to search in.
 * @param id The ID of the column to find.
 * @returns The name of the column.
 * @throws Error If the column ID isn't found.
 */
export function getColumnNameByID(table: Table, id: number): string {
	const value = table.columns.find((c) => c.id === id)?.label;
	if (!value) {
		throw new Error("Column ID not found");
	}
	return value;
}

/**
 * Gets a list of the columns within a Table as strings.
 *
 * @param table The Table to find the columns of.
 * @returns An array of strings that represent the column names.
 */
export function getColumnNames(table: Table): Array<string> {
	return table.columns.map((columnPair) => columnPair.label);
}

/**
 * Finds the first row that contains a cell with the specified value in the
 * given column.
 *
 * @param table The table to search in.
 * @param columnId The column to search in.
 * @param valueToFind The value to search for.
 * @returns The first row that contains the value in the column, or undefined if
 *   not found.
 */
export function getRowWithMatchingValueInColumn(
	table: Table,
	columnId: number,
	valueToFind: string,
): Row | undefined {
	const rows = table.contents;
	for (const row of rows) {
		const cell = getCellValueByColumnID(row, columnId);
		if (cell === valueToFind) {
			return row;
		}
	}
	return undefined;
}

/**
 * Returns an array of tuples with the unique values in a columns and the count
 * of how many times they appeared.
 *
 * @param table The Table to get the information of.
 * @param columnId The id of the column to find values in.
 * @returns An array of tuples with the unique value and the count of how many
 *   times it appears.
 */
export function getUniqueValuesInColumn(
	table: Table,
	columnId: number,
): Array<[string, number]> {
	const values: Array<[string, number]> = [];
	for (const row of table.contents) {
		const cellValue = getCellValueByColumnID(row, columnId);
		const existingRecord = values.find(
			(valuePair) => valuePair[0] === cellValue,
		);

		if (existingRecord) {
			existingRecord[1]++;
		} else {
			values.push([cellValue, 1]);
		}
	}
	return values;
}
