import { Parser } from "@json2csv/plainjs";
import type { RawRow, RawTable, Table } from "types";

import { getColumnNameByID } from "../access-helpers";

/**
 * Converts a Table object to a RawTable object for writing to a file.
 *
 * @param data The Table to convert.
 * @returns The RawTable object.
 */
function convertToRawTable(data: Table): RawTable {
	const rawTable: RawTable = [];
	for (const row of data.contents) {
		const rawRow: RawRow = {};
		for (const cell of row.contents) {
			const columnName = getColumnNameByID(data, cell.columnID);
			rawRow[columnName] = cell.value;
		}
		rawTable.push(rawRow);
	}
	return rawTable;
}

/**
 * Trigger a download of a file.
 *
 * @param filename The name of the file to download.
 * @param text The contents of the file.
 */
function download(filename: string, text: string): void {
	const element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text),
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

export type supportedFileTypes = "json" | "sql" | "csv";

/**
 * Convert the data to CSV format.
 *
 * @param rawData The data to convert.
 * @returns The data in CSV format.
 */
function prepareForCSV(rawData: RawTable): string {
	const parser = new Parser();
	return parser.parse(rawData);
}
/**
 * Convert the data to JSON format.
 *
 * @param rawData The data to convert.
 * @returns The data in JSON format.
 */
function prepareForJSON(rawData: RawTable): string {
	return JSON.stringify(rawData);
}

/**
 * Convert the data to SQL format.
 *
 * @param rawData The data to convert.
 * @returns The data in SQL format.
 */
function prepareForSQL(rawData: RawTable): string {
	let output = "";
	for (const row of rawData) {
		let columnNames = "";
		let columnValues = "";
		for (const [key, value] of Object.entries(row)) {
			columnNames += `"${key}", `;
			columnValues += `"${value}", `;
		}
		columnNames = columnNames.substring(0, columnNames.length - 2);
		columnValues = columnValues.substring(0, columnValues.length - 2);

		output += `INSERT INTO {TABLE_NAME} (${columnNames}) VALUES (${columnValues});\n`;
	}
	return output;
}

const processors = {
	csv: prepareForCSV,
	json: prepareForJSON,
	sql: prepareForSQL,
};

export default (
	data: Table,
	fileType: supportedFileTypes,
	fileName?: string,
): void => {
	const name = fileName
		? fileName + "." + fileType
		: `csv_magic_${Date.now()}.csv`;
	const rawData = convertToRawTable(data);
	const outputData = processors[fileType](rawData);
	download(name, outputData);
};
