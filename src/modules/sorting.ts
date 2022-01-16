import _ from 'lodash';
import { getCellValueByColumnID } from './access-helpers';
import { ISorts, ITable } from 'types';

/**
 * Either adds a sort on the provided key, or toggles direction, removes the sort if it was already toggled.
 *
 * @param  sorts    The currently active sorts
 * @param  columnID The key to change the sort status on.
 * @return The new sorts array with the sort applied.
 */
function setSort(sorts: ISorts, columnID: string) {
	let newSorts = _.cloneDeep(sorts);
	/**
	 * The existing sort (if any) on the key.
	 */
	const match = newSorts.find((e) => e[0] === columnID);
	if (match) {
		if (match[1]) match[1] = false;
		else {
			newSorts = newSorts.filter((e) => e[0] !== columnID);
		}
	} else {
		newSorts.push([columnID, true]);
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
function applySorting(data: ITable, sorts: ISorts) {
	const newData = _.cloneDeep(data);
	sorts.forEach((sort) => {
		const [key, ascending] = sort;
		newData.contents = newData.contents.sort((row1, row2) => {
			if (
				getCellValueByColumnID(row1, key).toUpperCase() >
				getCellValueByColumnID(row2, key).toUpperCase()
			)
				return ascending ? 1 : -1;
			if (
				getCellValueByColumnID(row1, key).toUpperCase() <
				getCellValueByColumnID(row2, key).toUpperCase()
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
