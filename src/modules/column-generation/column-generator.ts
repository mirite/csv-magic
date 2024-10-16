import type { Cell, Table } from "types";

import { registerColumnInTable } from "../csv/csv-loader";
import { cloneDeep, createCellID } from "../tools";

import type { GenerateColumnStrategy } from "./column-generators/GenerateColumnStrategy";

/**
 * Adds a new column to a Table and fills it with values using the method and
 * parameters provided.
 *
 * @template T The type of the method parameters.
 * @param data The Table to add the column to.
 * @param newColumnName The name of the new column
 * @param strategy The method used to generate the column.
 * @param methodParameters The options used by the method selected.
 * @returns A new Table with the column added.
 * @throws Error if the row doesn't have an id.
 */
export function addColumn<T>(
	data: Table,
	newColumnName: string,
	strategy: GenerateColumnStrategy<T>,
	methodParameters: T,
): Table {
	const newData = cloneDeep(data);
	if (strategy.init) {
		strategy.init(methodParameters);
	}
	const newColumnId = registerColumnInTable(newData, newColumnName);

	for (const row of newData.contents) {
		const cellValue = strategy.generate(row, methodParameters);
		if (!row.id) {
			throw new Error(
				"The row in which a column is being added does not have an id",
			);
		}
		const newCell: Cell = {
			id: createCellID(row.id, newColumnId),
			columnID: newColumnId,
			value: cellValue,
		};
		row.contents.push(newCell);
	}
	return newData;
}
