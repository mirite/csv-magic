import { cloneDeep, createUUID } from './tools';
import { IRow, ITable } from 'types';

export function deleteRow(data: ITable, row: IRow): ITable {
	const newData = cloneDeep(data) as ITable;
	newData.contents = newData.contents.filter(
		(rowInTable) => rowInTable.id !== row.id
	);
	return newData;
}

export function duplicateRow(data: ITable, row: IRow): ITable {
	const newData = cloneDeep(data) as ITable;
	const rowIndex = newData.contents.findIndex(
		(rowInTable) => rowInTable.id === row.id
	);
	const newRow = cloneDeep(row) as IRow;
	newRow.id = createUUID('row');
	for (const cell of newRow.contents) {
		const { columnID } = cell;
		cell.id = newRow.id + columnID;
	}
	newData.contents.splice(rowIndex, 0, newRow);
	return newData;
}
