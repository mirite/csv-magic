import _ from 'lodash';
import { ICell, ITable } from '../types';

function getCell(data: ITable, id: string): ICell | undefined {
	const rowId = id.replace(/\?\d+/, '');
	const indexMatch = id.match(/\?(\d+)/);
	if (!indexMatch) {
		throw new Error('Bad Cell Index Provided');
	}
	const cellIndex = Number(indexMatch[1]);
	const foundRow = data.contents.find((row) => row.id === rowId);
	if (!indexMatch) {
		throw new Error('Bad Row Index Provided');
	}
	const cell = foundRow?.contents[cellIndex];
	return cell;
}

export function updateCell(data: ITable, cell: ICell): ITable {
	const newData = _.cloneDeep(data);
	const cellToUpdate = getCell(newData, cell.id);
	if (cellToUpdate) cellToUpdate.value = cell.value;
	return newData;
}
