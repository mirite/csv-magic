import { ICell, IRow, ITable } from '../types';

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
