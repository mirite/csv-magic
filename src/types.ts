import type { ReactNode } from "react";

/** A single editor window/file. */
export interface File {
	/**
	 * A unique identifier for the file so that two files with the same name can
	 * be distinguished.
	 */
	id: number;
	/** The name of the file that was opened. */
	fileName: string;
	/** The current state of the Table in the file */
	table: Table;
	/** An array of currently active sorting methods. */
	activeSorts: Sorts;
	/** A list of previous states of the file. */
	history: FileHistory;

	/** A shortened version of the id, for display purposes. */
	prettyID: string;

	prettyName: string;
}

/** A list of previous versions of the Table in a file. */
export type FileHistory = Array<Table>;

/**
 * A list of sorts being applied to the Table, with the key as the first half of
 * a tuple and ascending? as the second.
 */
export type Sorts = Array<[number, boolean]>;

//Table Elements

/** A Table with rows and columns. */
export interface Table {
	/** The ID of the fist cell in a Table, used as the default cell being edited. */
	firstCellId?: string;

	columns: Array<Column>;

	/** An array of the rows within the Table. */
	contents: Array<Row>;
}

export interface Column {
	label: string;
	position: number;
	id: number;
}

/** A single row within the Table. */
export interface Row {
	/**
	 * A unique id for keying the row and allowing quicker access to the cells
	 * within.
	 */
	id?: number;

	/** The original line index of the row from when it was loaded from a file. */
	originalIndex: number;

	/** An array of the cells that comprise the row. */
	contents: Array<Cell>;
}

/** A single cell within the Table. */
export interface Cell {
	/** A unique identifier in the form {row.id?cellIndex} */
	id: string;

	/** The key or column that the cell belongs to. */
	columnID: number;

	/** The text content of the cell. */
	value: string;
}

/** A Table row as loaded from the file without any additional processing. */
export type RawRow = Record<string, string>;

/** A Table as loaded from the file without any additional processing. */
export type RawTable = Array<RawRow>;

export interface Filter {
	column: Column;
	values: string[];
}

export type Modal = ReactNode;

export interface MappedColumn {
	foreignTable: Table;
	sourceMatchID: number;
	foreignMatchID: number;
	foreignImportID: number;
}
