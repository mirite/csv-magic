import _ from 'lodash';
import { IFilter, ITable } from 'types';
import { getCellValueByKey } from './access-helpers';

function applyFilters(data: ITable, activeFilter: IFilter) {
	console.log(data, activeFilter);

	const newData = _.cloneDeep(data);

	newData.contents = newData.contents.filter((row) => {
		return activeFilter.values.includes(
			getCellValueByKey(row, activeFilter.column)
		);
	});

	return newData;
}

export default {
	applyFilters,
};
