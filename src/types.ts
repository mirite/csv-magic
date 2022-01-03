import BaseModal from 'components/modals/BaseModal';

/**
 * A single editor window/file.
 */
export interface IFile {
	/**
	 * The name of the file that was opened.
	 */
	fileName: string;
	/**
	 * The current state of the table in the file
	 */
	table: ITable;
	/**
	 * An array of currently active sorting methods.
	 */
	activeSorts: ISorts;
	/**
	 * A list of previous states of the file.
	 */
	history: IFileHistory;
}

/**
 * A list of previous versions of the table in a file.
 */
export interface IFileHistory extends Array<ITable> {}

/**
 * A list of sorts being applied to the table, with the key as the first half of
 * a tuple and ascending? as the second.
 */
export interface ISorts extends Array<[string, boolean]> {}

//Table Elements

/**
 * A table with rows and columns.
 */
export interface ITable {
	/**
	 * The ID of the fist cell in a table, used as the default cell being edited.
	 */
	firstCellId?: string;

	columns: Array<IColumn>;

	/**
	 * An array of the rows within the table.
	 */
	contents: Array<IRow>;
}

export interface IColumn {
	label: string;
	position: number;
	id: string;
}

/**
 * A single row within the table.
 */
export interface IRow {
	/**
	 * A unique id for keying the row and allowing quicker access to the cells within.
	 */
	id?: string;

	/**
	 * The original line index of the row from when it was loaded from a file.
	 */
	originalIndex: number;

	/**
	 * An array of the cells that comprise the row.
	 */
	contents: Array<ICell>;
}

/**
 * A single cell within the table.
 */
export interface ICell {
	/**
	 * A unique identifier in the form {row.id?cellIndex}
	 */
	id: string;

	/**
	 * The key or column that the cell belongs to.
	 */
	key: string;

	/**
	 * The text content of the cell.
	 */
	value: string;
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

export interface IModalAction {
	title: string;
	ComponentToUse: typeof BaseModal;
	onApply: Function;
}

export interface IActiveModal {
	action: IModalAction;
	column?: string;
}

export enum EGeneratorTypes {
	blank,
	statically,
	lookup,
	pool,
}

export interface IMappedColumn {
	foreignTable: ITable;
	sourceMatchKey: string;
	foreignMatchKey: string;
	foreignImportKey: string;
}

export interface IColumnPosition {
	columnName: string;
	index: number;
}
