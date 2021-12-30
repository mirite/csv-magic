import { Parser } from 'json2csv';
import { IRawRow, IRawTable, ITable } from 'types';

function convertToRawTable(data: ITable) {
	const rawTable: IRawTable = [];
	for (const row of data.contents) {
		const rawRow: IRawRow = {};
		for (const cell of row.contents) {
			rawRow[cell.key] = cell.value;
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

export default (data: ITable, fileName?: string) => {
	const rawData = convertToRawTable(data);
	const parser = new Parser();
	const outputData = parser.parse(rawData);
	const name = fileName ? fileName + '.csv' : `csv_magic_${Date.now()}.csv`;
	download(name, outputData);
};
