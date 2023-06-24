import { cloneDeep, createID } from './tools';
import { Row, Table } from "types";

export function deleteRow(data: Table, row: Row): Table {
  const newData = cloneDeep(data) as Table;
  newData.contents = newData.contents.filter(
    (rowInTable) => rowInTable.id !== row.id
  );
  return newData;
}

export function duplicateRow(data: Table, row: Row): Table {
  const newData = cloneDeep(data) as Table;
  const rowIndex = newData.contents.findIndex(
    (rowInTable) => rowInTable.id === row.id
  );
  const newRow = cloneDeep(row) as Row;
  newRow.id = createID("row");
  for (const cell of newRow.contents) {
    const { columnID } = cell;
    cell.id = newRow.id + "," + columnID;
  }
  newData.contents.splice(rowIndex, 0, newRow);
  return newData;
}
