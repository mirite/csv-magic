export interface IFile {
	fileName?: string;
	data?: ITable;
}

export interface ITable {
	firstCellId?: string;
	contents: Array<IRow>;
}

export interface IRow {
	id?: string;
	contents: Array<ICell>;
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

export interface IFilter {
	column: string;
	values: string[];
}
