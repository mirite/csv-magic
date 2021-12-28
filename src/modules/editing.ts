import _ from 'lodash';
import { ICell, ITable } from '../types';
import { getCellByID } from './access-helpers';

export function updateCell(data: ITable, cell: ICell): ITable {
	const newData = _.cloneDeep(data);
	const cellToUpdate = getCellByID(newData, cell.id);
	if (cellToUpdate) cellToUpdate.value = cell.value;
	return newData;
}
