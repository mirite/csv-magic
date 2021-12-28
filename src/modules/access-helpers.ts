import { IRow } from '../types';

/**
 * Takes a row and returns the value at the specified key.
 *
 * @param  row The row to search for the cell in,
 * @param  key The key of the value to find.
 * @return The value at the specified key. Blank if the key was not present.
 */
export function getCellValue(row: IRow, key: string): string {
	const foundCell = row.contents.find((cell) => cell.key === key);
	if (foundCell) return foundCell.value;
	return '';
}
