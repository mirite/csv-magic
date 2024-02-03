import { Cell, Column, Row, Table } from "types";

/**
 * Rearranges the columns in a Table.
 * @param  table          The Table to reorder the columns in.
 * @param  newColumnOrder An array of the ids of the columns in their new order.
 */
export function reorderColumns(table: Table, newColumnOrder: Array<number>): Table {
  const reorderedTable: Table = {
    columns: [],
    contents: [],
  };

  reorderedTable.columns = createNewColumnField(table.columns, newColumnOrder);

  reorderedTable.contents = createNewRows(table.contents, newColumnOrder);
  return reorderedTable;
}

/**
 *
 * @param columns
 * @param newColumnOrder
 */
function createNewColumnField(columns: Column[], newColumnOrder: number[]): Column[] {
  const newColumns: Column[] = [];
  let position = 0;
  for (const id of newColumnOrder) {
    const existingColumn: Column | undefined = columns.find((c) => c.id === id);
    if (!existingColumn) {
      throw new Error("Column ID not found in Table");
    }
    const { label } = existingColumn;
    newColumns.push({ position, id, label });
    position++;
  }
  return newColumns;
}

/**
 *
 * @param rows
 * @param newColumnOrder
 */
function createNewRows(rows: Row[], newColumnOrder: number[]): Row[] {
  return rows.map((row) => createNewRow(row, newColumnOrder));
}

/**
 *
 * @param row
 * @param newColumnOrder
 */
function createNewRow(row: Row, newColumnOrder: number[]): Row {
  const newRow: Row = {
    id: row.id,
    originalIndex: row.originalIndex,
    contents: [],
  };

  for (const columnID of newColumnOrder) {
    const existingCell: Cell | undefined = row.contents.find((c) => c.columnID === columnID);
    if (!existingCell) {
      throw new Error("Column ID not found in row");
    }
    const { id, value } = existingCell;
    newRow.contents.push({ columnID, id, value });
  }
  return newRow;
}
