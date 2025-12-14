import type { ReactNode } from "react";

/** A single cell within the Table. */
export type Cell = Row["contents"][number];
export type CellUpdateHandler = (cell: Cell, value: string) => unknown;

export type Column = Table["columns"][number];

/** A single editor window/file. */
export interface File {
	/** An array of currently active sorting methods. */
	activeSorts: Sorts;
	/** The name of the file that was opened. */
	fileName: string;
	/** A list of previous states of the file. */
	history: FileHistory;
	/**
	 * A unique identifier for the file so that two files with the same name can
	 * be distinguished.
	 */
	id: number;
	/** A shortened version of the id, for display purposes. */
	prettyID: string;

	prettyName: string;

	/** The current state of the Table in the file */
	table: {
		columns: {
			id: number;
			label: string;
			position: number;
		}[];

		/** An array of the rows within the Table. */
		contents: {
			/** An array of the cells that comprise the row. */
			contents: {
				/** The key or column that the cell belongs to. */
				columnID: number;

				/** A unique identifier in the form {row.id?cellIndex} */
				id: string;

				/** The text content of the cell. */
				value: string;
			}[];

			/**
			 * A unique id for keying the row and allowing quicker access to the cells
			 * within.
			 */
			id?: number;

			/** The original line index of the row from when it was loaded from a file. */
			originalIndex: number;
		}[];

		/**
		 * The ID of the fist cell in a Table, used as the default cell being
		 * edited.
		 */
		firstCellId?: string;
	};
}

//Table Elements

/** A list of previous versions of the Table in a file. */
export type FileHistory = Array<Table>;

export interface Filter {
	column: Column;
	values: string[];
}

export interface MappedColumn {
	foreignImportID: number;
	foreignMatchID: number;
	foreignTable: Table;
	sourceMatchID: number;
}

export type Modal = ReactNode;

/** A single row within the Table. */
export type Row = Table["contents"][number];

/** A function that takes a Table and a Row and returns a new Table. */
export type RowAction = (data: Table, row: Row) => Table;
export type RowActionHandler = (row: Row, action: RowAction) => unknown;
/**
 * A list of sorts being applied to the Table, with the key as the first half of
 * a tuple and ascending? as the second.
 */
export type Sorts = Array<[number, boolean]>;

/** A Table with rows and columns. */
export type Table = File["table"];
