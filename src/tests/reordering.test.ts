// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getColumnNames } from "modules/access-helpers";
import { reorderColumns } from "modules/reordering";
import testTable from "./testTable";

test("Reorder columns (headers)", () => {
  const newColumns = [
    "1bd90560-5142-4d62-a245-36e0003702ff",
    "911fd1c0-516d-44b0-b8fd-abeaf5344648",
    "9e012662-5520-477c-beef-2d979b25656d",
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  ];
  const reorderedTable = reorderColumns(testTable, newColumns);
  expect(getColumnNames(reorderedTable)).toEqual([
    "code",
    "retry",
    "Just Lols",
    "createdAt",
  ]);
});

test("Reorder columns (body)", () => {
  const newColumns = [
    "1bd90560-5142-4d62-a245-36e0003702ff",
    "911fd1c0-516d-44b0-b8fd-abeaf5344648",
    "9e012662-5520-477c-beef-2d979b25656d",
    "95a026a0-69c3-445d-8ad8-93af7e24ec7d",
  ];
  const reorderedTable = reorderColumns(testTable, newColumns);
  expect(reorderedTable.contents[0].contents[0].value).toEqual("400");
  expect(reorderedTable.contents[0].contents[1].value).toEqual("FALSE");
  expect(reorderedTable.contents[0].contents[2].value).toEqual("LOL");
  expect(reorderedTable.contents[0].contents[3].value).toEqual(
    "2021-11-30T22:47:16.830Z",
  );
});
