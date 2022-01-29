import { Parser } from 'json2csv';
import { IRawRow, IRawTable, ITable } from 'types';
import { getColumnNameByID } from './access-helpers';

function convertToRawTable(data: ITable) {
	const rawTable: IRawTable = [];
	for (const row of data.contents) {
		const rawRow: IRawRow = {};
		for (const cell of row.contents) {
			const columnName = getColumnNameByID(data, cell.columnID);
			rawRow[columnName] = cell.value;
		}
		rawTable.push(rawRow);
	}
	return rawTable;
}

function download(filename: string, text: string): void {
	const element = document.createElement('a');
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
	);
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

export type supportedFileTypes = 'json' | 'sql' | 'csv';

function prepareForCSV(rawData: IRawTable): string {
	const parser = new Parser();
	return parser.parse(rawData);
}
function prepareForJSON(rawData: IRawTable): string {
	return JSON.stringify(rawData);
}

function prepareForSQL(rawData: IRawTable): string {
	return '';
}

const processors = {
	csv: prepareForCSV,
	json: prepareForJSON,
	sql: prepareForSQL,
};

export default (
	data: ITable,
	fileType: supportedFileTypes,
	fileName?: string
) => {
	const name = fileName
		? fileName + '.' + fileType
		: `csv_magic_${Date.now()}.csv`;
	const rawData = convertToRawTable(data);
	const outputData = processors[fileType](rawData);
	download(name, outputData);
};
