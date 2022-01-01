import BaseModal from 'components/modals/BaseModal';
export interface IFile {
	fileName: string;
	table: ITable;
	/**
	 * An array of currently active sorting methods.
	 */
	activeSorts: ISorts;
	history: IFileHistory;
}

export interface IFileHistory extends Array<ITable> {}

export interface ISorts extends Array<[string, boolean]> {}

export interface ITable {
	firstCellId?: string;
	contents: Array<IRow>;
}

export interface IRow {
	id?: string;
	originalIndex: number;
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
