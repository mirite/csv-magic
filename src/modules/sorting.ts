import { getCellValue } from './access-helpers';
import { ITable } from '../types';

/**
 * Either adds a sort on the provided key, or toggles direction, removes the sort if it was already toggled.
 *
 * @param  sorts The currently active sorts
 * @param  key   The key to change the sort status on.
 * @return The new sorts array with the sort applied.
 */
function setSort(sorts: Array<[string, boolean]>, key: string) {
	/**
	 * The existing sort (if any) on the key.
	 */
	const match = sorts.find((e) => e[0] === key);
	if (match) {
		if (match[1]) match[1] = false;
		else {
			sorts = sorts.filter((e) => e[0] !== key);
		}
	} else {
		sorts.push([key, true]);
	}

	return sorts;
}

/**
 * Applies an array of sorts to a table.
 *
 * @param  data  The table to sort.
 * @param  sorts An array of the active sorts.
 * @return The table after all sorts have been applied.
 */
function applySorting(data: ITable, sorts: Array<[string, boolean]>) {
	sorts.forEach((sort) => {
		const [key, ascending] = sort;
		data = data.sort((row1, row2) => {
			if (
				getCellValue(row1, key).toUpperCase() >
				getCellValue(row2, key).toUpperCase()
			)
				return ascending ? 1 : -1;
			if (
				getCellValue(row1, key).toUpperCase() <
				getCellValue(row2, key).toUpperCase()
			)
				return ascending ? -1 : 1;
			return 0;
		});
	});

	return data;
}

export default {
	setSort,
	applySorting,
};
