import _ from 'lodash';
import { IFilter, ITable } from '../types';
import { getCellValueByKey } from './access-helpers';

function applyFilters(data: ITable, activeFilters: Array<IFilter>) {
	const newData = _.cloneDeep(data);
	activeFilters.forEach((currentFilter) => {
		newData.contents = newData.contents.filter((row) => {
			return currentFilter.values.includes(
				getCellValueByKey(row, currentFilter.column)
			);
		});
	});

	return newData;
}

export default {
	applyFilters,
};
