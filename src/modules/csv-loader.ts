import csv from 'csvtojson';
import { ITable } from '../components/Table';

async function loadFile(content:string) {
	return await csv().fromString(content);
}

export default async function (file: string):Promise<ITable> {
	const source = await loadFile(file);
	return source;
}