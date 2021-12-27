import _ from 'lodash';
import { ICell, ITable } from '../types';

function getCell(data: ITable, id: string) {
	for (const row of data) {
		for (const cell of row) {
			if (cell.id === id) {
				return cell;
			}
		}
	}

	return undefined;
}

export function updateCell(data: ITable, cell: ICell) {
	const newData = _.cloneDeep(data);
	const cellToUpdate = getCell(newData, cell.id);
	if (cellToUpdate) cellToUpdate.value = cell.value;
	return newData;
}
