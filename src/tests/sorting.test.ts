// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Sorting from "modules/sorting";
import type { Sorts } from "types";
import testTable from "./testTable";

test("Set sorts", () => {
  const sorts: Sorts = [];
  const newSorts = Sorting.setSort(
    sorts,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  );
  expect(newSorts.length).toBe(1);
  expect(newSorts[0]).toEqual(["95a026a0-69c3-445d-8ad8-93af7e24ec7d", true]);
  const newNewSorts = Sorting.setSort(
    newSorts,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  );
  expect(newNewSorts.length).toBe(1);
  expect(newNewSorts[0]).toEqual([
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
    false,
  ]);
});

test("Apply sorting", () => {
  const sorts: Sorts = Sorting.setSort(
    [],
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  );
  const sortedTable = Sorting.applySorting(testTable, sorts);
  expect(sortedTable.contents[0].contents[2].value).toBe(
    "2021-11-30T22:47:16.830Z",
  );
  const newSorts = Sorting.setSort(
    sorts,
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  );
  const newlySortedTable = Sorting.applySorting(testTable, newSorts);
  expect(newlySortedTable.contents[0].contents[2].value).toBe(
    "2021-11-30T22:48:20.292Z",
  );
});
