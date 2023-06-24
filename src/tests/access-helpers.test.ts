import * as accessHelpers from "modules/access-helpers";
import {
  countOccurrences,
  getColumnIndex,
  getRowWithMatchingValueInColumn,
  getUniqueValuesInColumn,
} from "modules/access-helpers";
import testTable from "./testTable";

test("Expect cell value in Table to be", () => {
  const cell = accessHelpers.getCellByID(
    testTable,
    "48d35c3c-b03e-43f6-8c8c-dd45db2a7d12?95a026a0-69c3-445d-8ad8-93af7e24ec7d"
  );
  expect(cell?.value).toBe("2021-11-30T22:47:16.830Z");
});

test("Expect cell value in row to be", () => {
  const cellValue = accessHelpers.getCellValueByColumnID(
    testTable.contents[1],
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d"
  );
  expect(cellValue).toBe("2021-11-30T22:47:21.910Z");
});

test("Expect column names to be", () => {
  const names = accessHelpers.getColumnNames(testTable);
  expect(names).toEqual([
    "Just Lols",
    "retry",
    "createdAt",
    "code",
    "extract",
    "generate",
    "extracted",
    "generated",
    "message",
    "source",
    "exportDataURI",
    "importDataURI",
    "_retryId",
    "legacyId",
  ]);
});

test("Expect unique values in column to be", () => {
  const uniques = getUniqueValuesInColumn(
    testTable,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d"
  );
  expect(uniques.length).toBe(13);
});

test("Expect column index to be", () => {
  expect(
    getColumnIndex(testTable, "95a026a0-69c3-445d-8ad8-93af7e24ec7d")
  ).toBe(2);
});

test("Expect count occurrences to be", () => {
  expect(
    countOccurrences(testTable, "95a026a0-69c3-445d-8ad8-93af7e24ec7d", "22:47")
  ).toBe(9);
});

test("Get row with matching value in column to be (1)", () => {
  const row = getRowWithMatchingValueInColumn(
    testTable,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
    "2021-11-30T22:47:33.536Z"
  );
  expect(row?.id).toBe("912a10cb-51a4-4942-8a42-fece194e62b1");
});

test("Get row with matching value in column to be (2)", () => {
  const row = getRowWithMatchingValueInColumn(
    testTable,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
    "22:4930:27.750Z"
  );
  expect(row).toBeUndefined();
});
