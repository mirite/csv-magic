import BaseModal, { BaseModalProps, BaseModalState } from 'components/modals/BaseModal/BaseModal';
import modals from "./components/modals";
import Element = React.JSX.Element;

/**
 * A single editor window/file.
 */
export interface IFile {
  /**
   * A unique identifier for the file so that two files with the same name can be distinguished.
   */
  id: string;
  /**
   * The name of the file that was opened.
   */
  fileName: string;
  /**
   * The current state of the Table in the file
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

  /**
   * A shortened version of the id, for display purposes.
   */
  prettyID: string;

  prettyName: string;
}

/**
 * A list of previous versions of the Table in a file.
 */
export type IFileHistory = Array<ITable>

/**
 * A list of sorts being applied to the Table, with the key as the first half of
 * a tuple and ascending? as the second.
 */
export type ISorts = Array<[string, boolean]>

//Table Elements

/**
 * A Table with rows and columns.
 */
export interface ITable {
  /**
   * The ID of the fist cell in a Table, used as the default cell being edited.
   */
  firstCellId?: string;

  columns: Array<IColumn>;

  /**
   * An array of the rows within the Table.
   */
  contents: Array<IRow>;
}

export interface IColumn {
  label: string;
  position: number;
  id: string;
}

/**
 * A single row within the Table.
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
 * A single cell within the Table.
 */
export interface ICell {
  /**
   * A unique identifier in the form {row.id?cellIndex}
   */
  id: string;

  /**
   * The key or column that the cell belongs to.
   */
  columnID: string;

  /**
   * The text content of the cell.
   */
  value: string;
}

/**
 * A Table row as loaded from the file without any additional processing.
 */
export interface IRawRow {
  [key: string]: string;
}

/**
 * A Table as loaded from the file without any additional processing.
 */
export type IRawTable = Array<IRawRow>

export interface IFilter {
  column: IColumn;
  values: string[];
}

export interface IActiveModal {
  Action: ConcreteModal;
  column?: IColumn;
}

export enum EGeneratorTypes {
  blank,
  statically,
  lookup,
  pool,
  duplicate,
}

export interface IMappedColumn {
  foreignTable: ITable;
  sourceMatchID: string;
  foreignMatchID: string;
  foreignImportID: string;
}

type ConcreteModal = typeof modals[keyof typeof modals];
export type availableModal = keyof typeof modals;
