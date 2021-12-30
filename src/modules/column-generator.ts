import _ from 'lodash';
import { EGeneratorTypes, IMappedColumn, ITable } from 'types';

export function addColumn(
	table: ITable,
	columnName: string,
	method: EGeneratorTypes,
	params?: string | string[] | IMappedColumn
): ITable {
	const newData = _.cloneDeep(table);
	return newData;
}
