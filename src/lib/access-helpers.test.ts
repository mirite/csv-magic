import { beforeEach, it, expect, describe } from "vitest";
import * as accessHelpers from "./access-helpers.js";
import {
	countOccurrences,
	getColumnIndex,
	getRowWithMatchingValueInColumn,
	getUniqueValuesInColumn,
} from "@/lib/index.js";
import type { Table } from "@/types.js";

describe("Access Helpers", () => {
	let testTable: Table;
	beforeEach(() => {
		testTable = {
			columns: [
				{ id: 0, label: "A", position: 0 },
				{ id: 1, label: "B", position: 1 },
				{ id: 2, label: "C", position: 2 },
			],
			contents: [
				{
					contents: [
						{
							columnID: 0,
							id: "48d35c3c",
							value: "2021-11-30T22:47:16.830Z",
						},
					],
					id: 2,
					originalIndex: 0,
				},
			],
		};
	});
	it("should be able to get a cell by its ID", () => {
		const cell = accessHelpers.getCellByID(testTable, "2,0");
		expect(cell?.value).toBe("2021-11-30T22:47:16.830Z");
	});

	it("should Expect cell value in row to be", () => {
		const cellValue = accessHelpers.getCellValueByColumnID(
			testTable.contents[0],
			0,
		);
		expect(cellValue).toBe("2021-11-30T22:47:16.830Z");
	});

	it("should Expect column names to be", () => {
		const names = accessHelpers.getColumnNames(testTable);
		expect(names).toEqual(["A", "B", "C"]);
	});

	it("should Expect unique values in column to be", () => {
		const uniques = getUniqueValuesInColumn(testTable, 0);
		expect(uniques.length).toBe(1);
	});

	it("should Expect column index to be", () => {
		expect(getColumnIndex(testTable, 2)).toBe(2);
	});

	it("should Expect count occurrences to be", () => {
		expect(countOccurrences(testTable, 0, "2021-11-30T22:47:16.830Z")).toBe(1);
	});

	it("should Get row with matching value in column to be (1)", () => {
		const row = getRowWithMatchingValueInColumn(
			testTable,
			0,
			"2021-11-30T22:47:16.830Z",
		);
		expect(row?.id).toBe(2);
	});

	it("should Get row with matching value in column to be (2)", () => {
		const row = getRowWithMatchingValueInColumn(
			testTable,
			0,
			"22:4930:27.750Z",
		);
		expect(row).toBeUndefined();
	});
});
