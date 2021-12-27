import { IRow } from '../types';

export function getCellValue(row: IRow, key: string): string {
	const foundCell = row.find((cell) => cell.key === key);
	if (foundCell) return foundCell.value;
	return '';
}
