import { parseString } from "@mirite/csv-json-parser";
import type { File, RawTable, Row, Table } from "types";

import { createCellID, createID } from "../tools";

/**
 * Takes the text content of a CSV file and returns the raw Table from it (an
 * array of objects (rows) with keys and values).
 *
 * @param content The text content of the CSV file.
 * @returns The raw Table from the file.
 */
async function loadFile(content: string): Promise<RawTable> {
	const result = await parseString<RawTable>(content);
	if (result) {
		return result;
	}
	return [];
	// return JSON.parse(parseString(content));
}

/**
 * Takes the raw Table and applies some processing to make it easier for our app
 * to work with. Transforms the rows from objects with keys to an array of our
 * ICell interface, adding ids and making it easier to loop through them.
 *
 * @param raw The raw Table loaded from the file.
 * @returns The Table with our format applied.
 */
function convertToTable(raw: RawTable): Table {
	/** The Table being created from the raw data. */
	const newTable: Table = { contents: [], columns: [] };

	if (raw.length > 0) {
		for (const label in raw[0]) {
			registerColumnInTable(newTable, label);
		}
	}
	for (let rowIndex = 0; rowIndex < raw.length; rowIndex++) {
		/** A new row within the output Table. */
		const newRow: Row = { contents: [], originalIndex: rowIndex };

		/** Counter to make cell ids somewhat predictable. */

		newRow.id = createID("row");
		for (
			let columnPosition = 0;
			columnPosition < newTable.columns.length;
			columnPosition++
		) {
			const column = newTable.columns[columnPosition];
			const value = raw[rowIndex][column.label];

			/** Give each cell a unique ID for finding it later on. */
			const id = createCellID(newRow.id, column.id);

			//If the Table doesn't have an active cell yet, indicate that this cell is the first in the Table.
			if (!newTable.firstCellId) {
				newTable.firstCellId = id;
			}
			newRow.contents.push({ id, value, columnID: column.id });
		}
		newTable.contents.push(newRow);
	}

	return newTable;
}

/**
 * Adds a column to the table.
 *
 * @param table The table to add the column to.
 * @param label The label of the column.
 * @returns The id of the column.
 */
export function registerColumnInTable(table: Table, label: string): number {
	const position = table.columns.length;
	const id = createID("column");
	table.columns.push({
		label,
		position,
		id,
	});
	return id;
}

/**
 * Converts the text content of a CSV file into a File object.
 *
 * @param fileName The name of the file.
 * @param fileText The text content of the file.
 * @returns The File object.
 */
export default async function (
	fileName: string,
	fileText: string,
): Promise<File> {
	const source = await loadFile(fileText);
	const data = convertToTable(source);
	const id = createID("file");
	const prettyName =
		fileName.length > 20 ? generatePrettyName(fileName) : fileName;
	return {
		fileName,
		table: data,
		activeSorts: [],
		history: [],
		id,
		prettyID: id.toString(),
		prettyName,
	};
}

/**
 * Generates a pretty name for a file.
 *
 * @param fileName The name of the file.
 * @returns The pretty name.
 */
function generatePrettyName(fileName: string) {
	return (
		fileName.substring(0, 10) + "~" + fileName.substring(fileName.length - 8)
	);
}
