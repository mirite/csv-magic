import { it, expect, describe, beforeEach } from "vitest";
import { getColumnNames } from "@/lib/index.js";
import { removeColumns, renameColumn } from "./editing.js";
import type { Column, Table } from "@/types.js";

describe("Column renaming and removing", () => {
	let testTable: Table;
	beforeEach(() => {
		testTable = {
			columns: [
				{ id: 0, label: "A" },
				{ id: 1, label: "B" },
				{ id: 2, label: "C" },
			],
			contents: [
				{
					contents: [
						{ columnID: 0, value: "1" },
						{ columnID: 1, value: "2" },
						{ columnID: 2, value: "3" },
					],
				},
			],
		} as Table;
	});
	it("should rename columns", () => {
		const newTable = renameColumn(testTable, 1, "blah");
		const columnNames = getColumnNames(newTable);
		expect(columnNames[1]).toBe("blah");
	});

	it("should remove columns", () => {
		const columnsToRemove: Array<Column> = [
			{
				id: 1,
				label: "retry",
				position: 1,
			},
			{
				id: 2,
				label: "createdAt",
				position: 2,
			},
		];
		const newTable = removeColumns(testTable, columnsToRemove);
		expect(newTable.columns.length).toBe(1);
		expect(newTable.columns[0].id).toBe(0);
		expect(newTable.contents[0].contents.length).toBe(1);
		expect(newTable.contents[0].contents[0].columnID).toBe(0);
	});
});
