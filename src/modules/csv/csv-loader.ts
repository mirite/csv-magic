import csv from "csvtojson";
import type { Table, Row, File, RawRow, RawTable } from "types";

import { getColumnId } from "../access-helpers";
import { createCellID, createID } from "../tools";

/**
 * Takes the text content of a CSV file and returns the raw Table from it (an
 * array of objects (rows) with keys and values).
 *
 * @param content The text content of the CSV file.
 * @returns The raw Table from the file.
 */
async function loadFile(content: string): Promise<RawTable> {
	return csv().fromString(content);
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

	raw.forEach((rawRow: RawRow, rowIndex) => {
		/** A new row within the output Table. */
		const newRow: Row = { contents: [], originalIndex: rowIndex };

		/** Counter to make cell ids somewhat predictable. */
		let columnPosition = 0;
		newRow.id = createID("row");
		for (const [label, rawValue] of Object.entries(rawRow)) {
			let columnId: number;
			if (rowIndex === 0) {
				columnId = registerColumnInTable(newTable, label);
			} else {
				columnId = getColumnId(newTable, columnPosition);
			}
			/** Give each cell a unique ID for finding it later on. */
			const id = createCellID(newRow.id, columnId);
			const value = String(rawValue); //csv2json will pop out an object instead of a string some times, so this is to force the cell value to be a string.

			//If the Table doesn't have an active cell yet, indicate that this cell is the first in the Table.
			if (!newTable.firstCellId) {
				newTable.firstCellId = id;
			}
			newRow.contents.push({ id, value, columnID: columnId });
			columnPosition++;
		}
		newTable.contents.push(newRow);
	});

	return newTable;
}

/**
 * @param table
 * @param label
 */
export function registerColumnInTable(table: Table, label: string) {
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
 * @param fileName
 * @param fileText
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
/** @param fileName */
function generatePrettyName(fileName: string) {
	return (
		fileName.substring(0, 10) + "~" + fileName.substring(fileName.length - 8)
	);
}
