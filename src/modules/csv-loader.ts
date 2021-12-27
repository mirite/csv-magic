import csv from 'csvtojson';
import {v4  as uuidv4} from 'uuid';
import { ITable, IRow, IFile } from '../types';

interface IRawRow{
	[key: string]: string;
}
interface IRawTable extends Array<IRawRow> {}

async function loadFile(content:string) {
	return await csv().fromString(content);
}

function convertToTable(raw: IRawTable): ITable {

	const newTable: ITable = [];
	
	raw.forEach((rawRow: IRawRow) => {
		const newRow:IRow = [];
		newRow.id = uuidv4();
		for (const cell of Object.entries(rawRow)) {
			const id = uuidv4();
			if(!newTable.firstCellId) newTable.firstCellId = id;
			newRow.push({ id, value: cell[1], key: cell[0] });
		}
		newTable.push(newRow);
	});

	return newTable;
}

export default async function (fileName:string, fileText: string):Promise<IFile> {
	const source = await loadFile(fileText);
	const data = convertToTable(source);
	return { fileName, data};
}