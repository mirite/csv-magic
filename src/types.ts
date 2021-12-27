export interface IFile {
	fileName?: string;
	data?: ITable;
}

export interface ITable extends Array<IRow> {
	firstCellId?: string;
}

export interface IRow extends Array<ICell> {
	id?: string;
}

export interface ICell {
	key: string,
	value: string;
	id: string;
}