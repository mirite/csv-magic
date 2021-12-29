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

interface IEditorCoreState {
	/**
	 * An array of currently active sorting methods.
	 */
	activeSorts: Array<[string, boolean]>;

	/**
	 * The current data showing after filters, sorts have been applied.
	 */
	activeData: ITable;
}

export interface IEditorHistory extends IEditorCoreState {
	timestamp: number;
}

export interface IEditorState extends IEditorCoreState {
	/**
	 * An array of the active filters applied with their key and value to show.
	 */
	activeFilters: Array<IFilter>;

	/**
	 * A column name indicates that a filter modal is being shown for that column.
	 */
	filtersShowing: string;

	history: Array<IEditorHistory>;
}
