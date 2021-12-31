import BaseModal from 'components/modals/BaseModal';
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
	activeModal: IActiveModal | undefined;
	history: Array<IEditorHistory>;
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
