import csv from 'csvtojson';
import { v4 as uuidv4 } from 'uuid';
import { ITable, IRow, IFile, IRawRow, IRawTable } from 'types';
import { getColumnId } from './access-helpers';

/**
 * Takes the text content of a CSV file and returns the raw table from it (an array of objects (rows) with keys and values).
 *
 * @param  content The text content of the CSV file.
 * @return The raw table from the file.
 */
async function loadFile(content: string): Promise<IRawTable> {
	return await csv().fromString(content);
}

/**
 * Takes the raw table and applies some processing to make it easier for our app to work with.
 * Transforms the rows from objects with keys to an array of our ICell interface, adding ids and making it easier to loop
 * through them.
 *
 * @param  raw The raw table loaded from the file.
 * @return The table with our format applied.
 */
function convertToTable(raw: IRawTable): ITable {
	/**
	 * The table being created from the raw data.
	 */
	const newTable: ITable = { contents: [], columns: [] };
	let rowIndex: number = 0;
	raw = raw.slice(0, 20);
	raw.forEach((rawRow: IRawRow) => {
		/**
		 * A new row within the output table.
		 */
		const newRow: IRow = { contents: [], originalIndex: rowIndex };

		/**
		 * Counter to make cell ids somewhat predictable.
		 */
		let columnPosition = 0;
		newRow.id = uuidv4();
		for (const cell of Object.entries(rawRow)) {
			let columnId;
			if (rowIndex === 0) {
				columnId = registerColumnInTable(newTable, cell[0]);
			}

			if (!columnId) {
				columnId = getColumnId(newTable, columnPosition);
			}
			/**
			 * Give each cell a unique ID for finding it later on.
			 */
			const id = newRow.id + '?' + columnId;
			const value = String(cell[1]); //csv2json will pop out an object instead of a string some times, so this is to force the cell value to be a string.

			//If the table doesn't have an active cell yet, indicate that this cell is the first in the table.
			if (!newTable.firstCellId) newTable.firstCellId = id;
			newRow.contents.push({ id, value, columnID: columnId });
			columnPosition++;
		}
		newTable.contents.push(newRow);
		rowIndex++;
	});

	return newTable;
}

export function registerColumnInTable(table: ITable, label: string) {
	const id = uuidv4();
	const position = table.columns.length;
	table.columns.push({
		label,
		position,
		id,
	});
	return id;
}

export default async function (
	fileName: string,
	fileText: string
): Promise<IFile> {
	const source = await loadFile(fileText);
	const data = convertToTable(source);
	return { fileName, table: data, activeSorts: [], history: [] };
}
