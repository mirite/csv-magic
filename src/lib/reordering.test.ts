import { expect, describe, beforeEach, it } from "vitest";
import { getColumnNames } from "@/lib/index.js";
import { reorderColumns } from "./reordering.js";
import type { Table } from "@/types.js";

describe("Reorder columns", () => {
	let testTable: Table;
	beforeEach(() => {
		testTable = {
			columns: [
				{ id: 0, label: "createdAt" },
				{ id: 1, label: "Just Lols" },
				{ id: 2, label: "code" },
				{ id: 4, label: "retry" },
			],
			contents: [
				{
					contents: [
						{ columnID: 0, value: "2021-11-30T22:47:16.830Z" },
						{ columnID: 1, value: "LOL" },
						{ columnID: 2, value: "400" },
						{ columnID: 4, value: "FALSE" },
					],
				},
			],
		} as Table;
	});
	it("should reorder columns (headers)", () => {
		const newColumns = [2, 4, 1, 0];
		const reorderedTable = reorderColumns(testTable, newColumns);
		expect(getColumnNames(reorderedTable)).toEqual([
			"code",
			"retry",
			"Just Lols",
			"createdAt",
		]);
	});

	it("should reorder columns (body)", () => {
		const newColumns = [2, 4, 1, 0];
		const reorderedTable = reorderColumns(testTable, newColumns);
		expect(reorderedTable.contents[0].contents[0].value).toEqual("400");
		expect(reorderedTable.contents[0].contents[1].value).toEqual("FALSE");
		expect(reorderedTable.contents[0].contents[2].value).toEqual("LOL");
		expect(reorderedTable.contents[0].contents[3].value).toEqual(
			"2021-11-30T22:47:16.830Z",
		);
	});
});
