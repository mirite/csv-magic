// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getColumnNames } from "modules/access-helpers";
import { removeColumns, renameColumn } from "modules/editing";
import type { Column } from "types";
import testTable from "./testTable";

test("Rename columns", () => {
  const newTable = renameColumn(
    testTable,
    "911fd1c0-516d-44b0-b8fd-abeaf5344648",
    "blah",
  );
  const columnNames = getColumnNames(newTable);
  expect(columnNames[1]).toBe("blah");
});

test("Remove Columns", () => {
  const columnsToRemove: Array<Column> = [
    {
      label: "retry",
      position: 1,
      id: "911fd1c0-516d-44b0-b8fd-abeaf5344648",
    },
    {
      label: "createdAt",
      position: 2,
      id: "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
    },
  ];
  const newTable = removeColumns(testTable, columnsToRemove);
  expect(newTable.columns.length).toBe(12);
  expect(newTable.columns[1].id).toBe("1bd90560-5142-4d62-a245-36e0003702ff");
  expect(newTable.contents[0].contents.length).toBe(12);
  expect(newTable.contents[0].contents[1].columnID).toBe(
    "1bd90560-5142-4d62-a245-36e0003702ff",
  );
});
