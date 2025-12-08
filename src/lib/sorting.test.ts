import { Sorting } from "./sorting.js";
import type { Sorts, Table } from "@/types.js";
import { expect, describe, it } from "vitest";

describe("Sorting", () => {
	it("should set sorts", () => {
		const sorts: Sorts = [];
		const newSorts = Sorting.setSort(sorts, 0);
		expect(newSorts.length).toBe(1);
		expect(newSorts[0]).toEqual([0, true]);
		const newNewSorts = Sorting.setSort(newSorts, 0);
		expect(newNewSorts.length).toBe(1);
		expect(newNewSorts[0]).toEqual([0, false]);
	});

	it("should apply sorting", () => {
		const testTable = {
			columns: [{ id: 0, label: "", position: 0 }],
			contents: [
				{
					contents: [{ columnID: 0, value: "2021-11-30T22:48:20.292Z" }],
					originalIndex: 0,
				},
				{
					contents: [{ columnID: 0, value: "2021-11-30T22:47:16.830Z" }],
					originalIndex: 1,
				},
			],
		} as Table;
		const sorts: Sorts = Sorting.setSort([], 0);
		const sortedTable = Sorting.applySorting(testTable, sorts);
		expect(sortedTable.contents[0].contents[0].value).toBe(
			"2021-11-30T22:47:16.830Z",
		);
		const newSorts = Sorting.setSort(sorts, 0);
		const newlySortedTable = Sorting.applySorting(testTable, newSorts);
		expect(newlySortedTable.contents[0].contents[0].value).toBe(
			"2021-11-30T22:48:20.292Z",
		);
	});
});
