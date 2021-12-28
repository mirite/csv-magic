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
	key: string;
	value: string;
	id: string;
}

/**
 * A table row as loaded from the file without any additional processing.
 */
 export interface IRawRow {
	[key: string]: string;
}

/**
 * A table as loaded from the file without any additional processing.
 */
export interface IRawTable extends Array<IRawRow> {}
