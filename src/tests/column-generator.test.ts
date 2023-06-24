// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getCellValueByColumnID, getColumns } from "modules/access-helpers";
import {
  addColumn,
  EGeneratorTypes,
} from "modules/column-generation/column-generator";
import testTable from "./testTable";
import testTable2 from "./testTable2";

test("Add blank column", () => {
  const newTable = addColumn(
    testTable,
    "test",
    EGeneratorTypes.blank,
    undefined
  );

  const columns = getColumns(newTable);
  const lastColumn = columns[columns.length - 1];
  expect(lastColumn?.label).toBe("test");
  expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe("");
});

test("Add static column", () => {
  const newTable = addColumn(
    testTable,
    "testStatic",
    EGeneratorTypes.statically,
    "abc123"
  );

  const columns = getColumns(newTable);
  const lastColumn = columns[columns.length - 1];
  expect(lastColumn?.label).toBe("testStatic");
  expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
    "abc123"
  );
});

test("Add duplicated column", () => {
  const newTable = addColumn(
    testTable,
    "testDuplicate",
    EGeneratorTypes.duplicate,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d"
  );

  const columns = getColumns(newTable);
  const lastColumn = columns[columns.length - 1];
  expect(lastColumn?.label).toBe("testDuplicate");
  expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
    "2021-11-30T22:47:16.830Z"
  );
  expect(getCellValueByColumnID(newTable.contents[1], lastColumn?.id)).toBe(
    "2021-11-30T22:47:21.910Z"
  );
});

test("Add pool column", () => {
  const newTable = addColumn(testTable, "testPool", EGeneratorTypes.pool, [
    "a",
    "b",
    "c",
  ]);

  const columns = getColumns(newTable);
  const lastColumn = columns[columns.length - 1];
  expect(lastColumn?.label).toBe("testPool");
  const firstValue = getCellValueByColumnID(
    newTable.contents[0],
    lastColumn?.id
  );
  const secondValue = getCellValueByColumnID(
    newTable.contents[1],
    lastColumn?.id
  );
  const thirdValue = getCellValueByColumnID(
    newTable.contents[2],
    lastColumn?.id
  );

  expect(firstValue).toMatch(/[abc]/);

  if (firstValue === "a") {
    expect(secondValue).toBe("b");
    expect(thirdValue).toBe("c");
  }
  if (firstValue === "b") {
    expect(secondValue).toBe("c");
    expect(thirdValue).toBe("a");
  }

  if (firstValue === "c") {
    expect(secondValue).toBe("a");
    expect(thirdValue).toBe("b");
  }
});

test("Add lookup column", () => {
  const newTable = addColumn(testTable, "testLookup", EGeneratorTypes.lookup, {
    foreignTable: testTable2,
    sourceMatchID: "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
    foreignMatchID: "remote-column-id",
    foreignImportID: "remote-lookup-id",
  });

  const columns = getColumns(newTable);
  const lastColumn = columns[columns.length - 1];
  expect(lastColumn?.label).toBe("testLookup");
  expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
    "https://4263974.app.netsuite.com/app/common/entity/contact.nl?id=13233"
  );
});
