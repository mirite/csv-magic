import type { Filter, Table } from "types";

import { getCellValueByColumnID } from "./access-helpers";
import { cloneDeep } from "./tools";

/**
 * @param data
 * @param activeFilter
 */
function applyFilters(data: Table, activeFilter: Filter) {
	const newData = cloneDeep(data);

	newData.contents = newData.contents.filter((row) => {
		return activeFilter.values.includes(
			getCellValueByColumnID(row, activeFilter.column.id),
		);
	});

	return newData;
}

export default {
	applyFilters,
};
