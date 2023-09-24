import { Parser } from "@json2csv/plainjs";
import { RawRow, RawTable, Table } from "types";
import { getColumnNameByID } from "../access-helpers";

/**
 *
 * @param data
 */
function convertToRawTable(data: Table) {
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
 *
 * @param filename
 * @param text
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
 *
 * @param rawData
 */
function prepareForCSV(rawData: RawTable): string {
  const parser = new Parser();
  return parser.parse(rawData);
}
/**
 *
 * @param rawData
 */
function prepareForJSON(rawData: RawTable): string {
  return JSON.stringify(rawData);
}

/**
 *
 * @param rawData
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
) => {
  const name = fileName
    ? fileName + "." + fileType
    : `csv_magic_${Date.now()}.csv`;
  const rawData = convertToRawTable(data);
  const outputData = processors[fileType](rawData);
  download(name, outputData);
};
