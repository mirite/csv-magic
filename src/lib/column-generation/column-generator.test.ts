import { it, expect, describe, beforeEach } from "vitest";
import { getCellValueByColumnID } from "@/lib/index.js";
import {
	addColumn,
	Duplicate,
	Pool,
	Statically,
	Lookup,
	Blank,
} from "./index.js";
import type { Table } from "@/types.js";

describe("Column Generation", () => {
	let testTable: Table;
	beforeEach(() => {
		testTable = {
			columns: [{ id: 0, label: "Existing", position: 0 }],
			contents: [
				{
					contents: [{ columnID: 0, id: "a", value: "A" }],
					id: 1,
				},
				{
					contents: [{ columnID: 0, id: "b", value: "B" }],
					id: 2,
				},
				{
					contents: [{ columnID: 0, id: "c", value: "C" }],
					id: 3,
				},
				{
					contents: [{ columnID: 0, id: "d", value: "D" }],
					id: 4,
				},
			],
		} as Table;
	});
	it("should add blank column", () => {
		const newTable = addColumn(testTable, "test", Blank, undefined);

		const columns = newTable.columns;
		const lastColumn = columns[columns.length - 1];
		expect(lastColumn?.label).toBe("test");
		expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
			"",
		);
	});

	it("should add static column", () => {
		const newTable = addColumn(testTable, "testStatic", Statically, "abc123");

		const columns = newTable.columns;
		const lastColumn = columns[columns.length - 1];
		expect(lastColumn?.label).toBe("testStatic");
		expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
			"abc123",
		);
	});

	it("should add duplicated column", () => {
		const newTable = addColumn(testTable, "testDuplicate", Duplicate, 0);

		const columns = newTable.columns;
		const lastColumn = columns[columns.length - 1];
		expect(lastColumn?.label).toBe("testDuplicate");
		expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
			"A",
		);
		expect(getCellValueByColumnID(newTable.contents[1], lastColumn?.id)).toBe(
			"B",
		);
	});

	it("should add pool column", () => {
		const newTable = addColumn(testTable, "testPool", Pool, ["a", "b", "c"]);

		const columns = newTable.columns;
		const lastColumn = columns[columns.length - 1];
		expect(lastColumn?.label).toBe("testPool");
		const firstValue = getCellValueByColumnID(
			newTable.contents[0],
			lastColumn?.id,
		);
		const secondValue = getCellValueByColumnID(
			newTable.contents[1],
			lastColumn?.id,
		);
		const thirdValue = getCellValueByColumnID(
			newTable.contents[2],
			lastColumn?.id,
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

	it("should add lookup column", () => {
		const testTable2 = {
			columns: [
				{ id: 0, label: "keys", position: 0 },
				{ id: 1, label: "values", position: 1 },
			],
			contents: [
				{
					contents: [
						{
							columnID: 0,
							value: "A",
						},
						{
							columnID: 1,
							value:
								"https://4263974.app.netsuite.com/app/common/entity/contact.nl?id=13233",
						},
					],
				},
			],
		} as Table;
		const newTable = addColumn(testTable, "testLookup", Lookup, {
			foreignImportID: 1,
			foreignMatchID: 0,
			foreignTable: testTable2,
			sourceMatchID: 0,
		});

		const columns = newTable.columns;
		const lastColumn = columns[columns.length - 1];
		expect(lastColumn?.label).toBe("testLookup");
		expect(getCellValueByColumnID(newTable.contents[0], lastColumn?.id)).toBe(
			"https://4263974.app.netsuite.com/app/common/entity/contact.nl?id=13233",
		);
	});
});
