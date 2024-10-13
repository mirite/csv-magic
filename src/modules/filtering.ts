import type { Filter, Table } from "types";

import { getCellValueByColumnID } from "./access-helpers";
import { cloneDeep } from "./tools";

/**
 * Applies a filter to a Table.
 *
 * @param data The Table to filter.
 * @param activeFilter The filter to apply.
 * @returns A new Table with the filter applied.
 */
function applyFilters(data: Table, activeFilter: Filter): Table {
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
