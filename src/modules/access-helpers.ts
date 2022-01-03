import { ICell, IColumn, IRow, ITable } from 'types';

/**
 * Takes a row and returns the value at the specified key.
 *
 * @param  row      The row to search for the cell in,
 * @param  columnId The key of the value to find.
 * @return The value at the specified key. Blank if the key was not present.
 */
export function getCellValueByColumnID(row: IRow, columnId: string): string {
	const foundCell = row.contents.find((cell) => cell.key === columnId);
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
	const ids = id.split('?');
	const rowId = ids[0];
	const columnId = ids[1];
	if (!columnId || !rowId) {
		throw new Error('Bad Cell Id Provided');
	}
	const cellIndex = getColumnIndex(table, columnId);
	const foundRow = table.contents.find((row) => row.id === rowId);
	const cell = foundRow?.contents[cellIndex];
	return cell;
}

/**
 * Gets a list of the columns within a table as strings.
 *
 * @param  table The table to find the columns of.
 * @return An array of strings that represent the column names.
 */
export function getColumnNames(table: ITable): Array<string> {
	return getColumns(table).map((columnPair) => columnPair.label);
}

/**
 * Gets a list of the columns within a table.
 *
 * @param  table The table to find the columns of.
 * @return An array of columns with their indexes.
 */
export function getColumns(table: ITable): Array<IColumn> {
	return table.columns;
}

/**
 * Returns an array of tuples with the unique values in a columns and the count of how many times they appeared.
 *
 * @param  table    The table to get the information of.
 * @param  columnId The id of the column to find values in.
 * @return An array of tuples with the unique value and the count of how many times it appears.
 */
export function getUniqueValuesInColumn(
	table: ITable,
	columnId: string
): Array<[string, number]> {
	const values: Array<[string, number]> = [];
	for (const row of table.contents) {
		const cellValue = getCellValueByColumnID(row, columnId);
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
 * @param  data     The table to search in.
 * @param  columnId The id of the column to find.
 * @return The 0-based index within a row that corresponds to the column name, -1 if the column was not found.
 */
export function getColumnIndex(data: ITable, columnId: string): number {
	const { columns } = data;
	const column = columns.find((c) => c.id === columnId);
	if (column) return column.position;
	return -1;
}

/**
 * Returns the index within a row that corresponds to the column name provided.
 *
 * @param  data  The table to search in.
 * @param  index The name position index of the column to find.
 * @return The id of the column.
 */
export function getColumnId(data: ITable, index: number): string {
	const { columns } = data;
	const column = columns.find((c) => c.position === index);
	if (!column) throw new Error('No column found at position ' + index);
	return column.id;
}

export function countOccurrences(
	data: ITable,
	columnID: string,
	needle: string
): number {
	const columnIndex = getColumnIndex(data, columnID);
	let count = 0;
	for (const row of data.contents) {
		if (row.contents[columnIndex].value.includes(needle)) count++;
	}
	return count;
}

export function getRowWithMatchingValueInColumn(
	table: ITable,
	columnId: string,
	valueToFind: string
): IRow | undefined {
	const rows = table.contents;
	for (const row of rows) {
		const cell = getCellValueByColumnID(row, columnId);
		if (cell === valueToFind) {
			return row;
		}
	}
	return undefined;
}
