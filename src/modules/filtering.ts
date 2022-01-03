import _ from 'lodash';
import { IFilter, ITable } from 'types';
import { getCellValueByColumnID } from './access-helpers';

function applyFilters(data: ITable, activeFilter: IFilter) {
	const newData = _.cloneDeep(data);

	newData.contents = newData.contents.filter((row) => {
		return activeFilter.values.includes(
			getCellValueByColumnID(row, activeFilter.column)
		);
	});

	return newData;
}

export default {
	applyFilters,
};
