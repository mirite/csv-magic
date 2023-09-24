import { registerColumnInTable } from "../csv/csv-loader";
import { cloneDeep, createCellID } from "../tools";
import { Cell, Table } from "types";
import { GenerateColumnStrategy } from "./column-generators/GenerateColumnStrategy";

/**
 * Adds a new column to a Table and fills it with values using the method and parameters provided.
 * @param  data             The Table to add the column to.
 * @param  newColumnName    The name of the new column
 * @param strategy
 * @param  methodParameters The options used by the method selected.
 * @returns A new Table with the column added.
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
