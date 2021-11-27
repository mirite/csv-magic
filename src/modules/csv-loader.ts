import csv from 'csvtojson';
import { ITable } from '../components/Table';

export interface IFile {
	fileName?: string;
	data?: ITable;
}

async function loadFile(content:string) {
	return await csv().fromString(content);
}

export default async function (fileName:string, fileText: string):Promise<IFile> {
	const source = await loadFile(fileText);
	return { fileName, data: source };
}