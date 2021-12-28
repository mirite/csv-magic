import _ from 'lodash';
import { ITable } from '../types';
import { getCellValueByKey } from './access-helpers';

function applyFilters(data: ITable, activeFilters: Array<[string, string]>) {
	const newData = _.cloneDeep(data);
	activeFilters.forEach((currentFilter) => {
		newData.contents = newData.contents.filter((row) => {
			return (
				getCellValueByKey(row, currentFilter[0]) === currentFilter[1]
			);
		});
	});

	return newData;
}

export default {
	applyFilters,
};
