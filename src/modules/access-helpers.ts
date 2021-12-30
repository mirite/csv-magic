import { ICell, IRow, ITable } from 'types';

/**
 * Takes a row and returns the value at the specified key.
 *
 * @param  row The row to search for the cell in,
 * @param  key The key of the value to find.
 * @return The value at the specified key. Blank if the key was not present.
 */
export function getCellValueByKey(row: IRow, key: string): string {
	const foundCell = row.contents.find((cell) => cell.key === key);
	if (foundCell) return foundCell.value;
	return '';
}

/**
 * Finds a specified cell by id within a table.
 *
 * @param  table The table tto to search in.
 * @param  id    The ID of the cell to find.
 * @return The cell at the specified id.
 */
export function getCellByID(table: ITable, id: string): ICell | undefined {
	const rowId = id.replace(/\?\d+/, '');
	const indexMatch = id.match(/\?(\d+)/);
	if (!indexMatch) {
		throw new Error('Bad Cell Index Provided');
	}
	const cellIndex = Number(indexMatch[1]);
	const foundRow = table.contents.find((row) => row.id === rowId);
	if (!indexMatch) {
		throw new Error('Bad Row Index Provided');
	}
	const cell = foundRow?.contents[cellIndex];
	return cell;
}

/**
 * Gets a list of the columns within a table.
 *
 * @param  table The table to find the columns of.
 * @return An array of strings that represent the column names.
 */
export function getColumnNames(table: ITable): Array<string> {
	const exampleRow = table.contents[0];
	if (!exampleRow) throw new Error('No Rows Found In Table');
	return exampleRow.contents.map((cell) => cell.key);
}

/**
 * Returns an array of tuples with the unique values in a columns and the count of how many times they appeared.
 *
 * @param  table  The table to get the information of.
 * @param  column The name of the column to find values in.
 * @return An array of tuples with the unique value and the count of how many times it appears.
 */
export function getUniqueValuesInColumn(
	table: ITable,
	column: string
): Array<[string, number]> {
	const values: Array<[string, number]> = [];
	for (const row of table.contents) {
		const cellValue = getCellValueByKey(row, column);
		const existingRecord = values.find(
			(valuePair) => valuePair[0] === cellValue
		);

		if (existingRecord) {
			existingRecord[1]++;
		} else {
			values.push([cellValue, 1]);
		}
	}
	return values;
}

/**
 * Returns the index within a row that corresponds to the column name provided.
 *
 * @param  data   The table to search in.
 * @param  column The name of the column to find.
 * @return The 0-based index within a row that corresponds to the column name, -1 if the column was not found.
 */
export function getColumnIndex(data: ITable, column: string): number {
	const firstRow = data.contents[0];
	let columnIndex = 0;
	if (!firstRow) throw new Error('No row provided');
	for (const cell of firstRow.contents) {
		if (cell.key === column) return columnIndex;
		columnIndex++;
	}
	return -1;
}

export function countOccurrences(
	data: ITable,
	column: string,
	needle: string
): number {
	const columnIndex = getColumnIndex(data, column);
	let count = 0;
	for (const row of data.contents) {
		if (row.contents[columnIndex].value.includes(needle)) count++;
	}
	return count;
}
