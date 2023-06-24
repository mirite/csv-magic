import GenerateColumnStrategy, {
  StrategyParameters,
} from "./column-generators/GenerateColumnStrategy";
import { Pool } from "./column-generators/Pool";
import { Blank } from "./column-generators/Blank";
import { Duplicate } from "./column-generators/Duplicate";
import { Statically } from "./column-generators/Statically";
import { Lookup } from "./column-generators/Lookup";
import { registerColumnInTable } from "../csv/csv-loader";
import { cloneDeep, createCellID } from "../tools";
import { Cell, MappedColumn, Table } from "types";

export enum EGeneratorTypes {
  blank,
  statically,
  lookup,
  pool,
  duplicate,
}

function getStrategy(
  method: EGeneratorTypes,
  methodParameters: StrategyParameters
): GenerateColumnStrategy {
  switch (method) {
    case EGeneratorTypes.pool:
      return new Pool(methodParameters);
    case EGeneratorTypes.blank:
      return new Blank(methodParameters);
    case EGeneratorTypes.lookup:
      return new Lookup(methodParameters);
    case EGeneratorTypes.duplicate:
      return new Duplicate(methodParameters);
    case EGeneratorTypes.statically:
      return new Statically(methodParameters);
  }
}

export type MethodParameters = string | string[] | MappedColumn | undefined | number;
/**
 * Adds a new column to a Table and fills it with values using the method and parameters provided.
 *
 * @param  data             The Table to add the column to.
 * @param  newColumnName    The name of the new column
 * @param  method           The method used to create the new values.
 * @param  methodParameters The options used by the method selected.
 * @return A new Table with the column added.
 */
export function addColumn(
  data: Table,
  newColumnName: string,
  method: EGeneratorTypes,
  methodParameters: MethodParameters
): Table {
  const newData = cloneDeep(data) as Table;
  const strategy = getStrategy(method, methodParameters);
  const newColumnId = registerColumnInTable(newData, newColumnName);

  for (const row of newData.contents) {
    const cellValue = strategy.getValue(row);
    if (!row.id) {
      throw new Error(
        "The row in which a column is being added does not have an id"
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
