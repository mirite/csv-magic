import { getCellValueByKey } from './access-helpers';
import { ITable } from '../types';
import _ from 'lodash';

/**
 * Either adds a sort on the provided key, or toggles direction, removes the sort if it was already toggled.
 *
 * @param  sorts The currently active sorts
 * @param  key   The key to change the sort status on.
 * @return The new sorts array with the sort applied.
 */
function setSort(sorts: Array<[string, boolean]>, key: string) {
	let newSorts = _.cloneDeep(sorts);
	/**
	 * The existing sort (if any) on the key.
	 */
	const match = newSorts.find((e) => e[0] === key);
	if (match) {
		if (match[1]) match[1] = false;
		else {
			newSorts = newSorts.filter((e) => e[0] !== key);
		}
	} else {
		newSorts.push([key, true]);
	}

	return newSorts;
}

/**
 * Applies an array of sorts to a table.
 *
 * @param  data  The table to sort.
 * @param  sorts An array of the active sorts.
 * @return The table after all sorts have been applied.
 */
function applySorting(data: ITable, sorts: Array<[string, boolean]>) {
	const newData = _.cloneDeep(data);
	sorts.forEach((sort) => {
		const [key, ascending] = sort;
		newData.contents = newData.contents.sort((row1, row2) => {
			if (
				getCellValueByKey(row1, key).toUpperCase() >
				getCellValueByKey(row2, key).toUpperCase()
			)
				return ascending ? 1 : -1;
			if (
				getCellValueByKey(row1, key).toUpperCase() <
				getCellValueByKey(row2, key).toUpperCase()
			)
				return ascending ? -1 : 1;
			return 0;
		});
	});

	return newData;
}

export default {
	setSort,
	applySorting,
};
