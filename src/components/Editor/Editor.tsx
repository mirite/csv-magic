import { deleteRow, duplicateRow } from "modules/row-actions";
import Sorting from "modules/sorting";
import { useFileStore } from "modules/useFileStore";
import React, {
	createContext,
	type ReactElement,
	useCallback,
	useState,
} from "react";
import type { Modal, Row, Sorts, Table } from "types";

import Chrome from "../Chrome/Chrome";
import TableComponent from "../Table/TableComponent";

export type ModalContextType = {
	setActiveModal: (modal: Modal) => void;
	table: Table;
	onClose: (changedTable?: Table) => void;
};

const rowActions = {
	delete: deleteRow,
	duplicate: duplicateRow,
} as const;

export type RowAction = keyof typeof rowActions;
export let ModalContext: ReturnType<typeof createContext<ModalContextType>>;

/**
 * The main editor component. Contains the table and the chrome.
 *
 * @returns The editor component.
 */
function Editor(): ReactElement {
	const { currentFile, updateCurrentFile } = useFileStore();
	const file = currentFile()!; //Main makes sure this is not null before calling Editor.

	const { table, history, activeSorts } = file;

	const [activeModal, setActiveModal] = useState<undefined | Modal>(undefined);
	const [activeCell, setActiveCell] = useState(table.firstCellId);

	const handleTableClick = useCallback(
		(e: React.MouseEvent<HTMLTableSectionElement>) => {
			const { target } = e;
			const { dataset } = target as HTMLElement;
			if (dataset && dataset.id) {
				setActiveCell(dataset.id);
			}
		},
		[],
	);

	const handleSort = (columnID: number) => {
		const newSorts = Sorting.setSort(activeSorts, columnID);

		const newData = Sorting.applySorting(table, newSorts);
		setCoreState(newData, newSorts);
	};

	const handleModalClose = (changedTable?: Table) => {
		if (changedTable) {
			setCoreState(changedTable);
		}
		setActiveModal(undefined);
	};

	const handleRowAction = (action: RowAction, row: Row) => {
		const newTable = rowActions[action](table, row);
		setCoreState(newTable);
	};

	const setCoreState = (newTable: Table, newSorts?: Sorts) => {
		const newHistory = [...history, table];
		updateCurrentFile(newTable, newSorts || activeSorts, newHistory);
	};

	const modalContext = { setActiveModal, onClose: handleModalClose, table };
	ModalContext = createContext<ModalContextType>(modalContext);

	return (
		<ModalContext.Provider value={modalContext}>
			<Chrome onTableChange={(e: Table) => setCoreState(e)} />
			<TableComponent
				onSort={(e) => handleSort(e)}
				onTableChange={(e: Table) => setCoreState(e)}
				onRowAction={(action, row) => handleRowAction(action, row)}
				activeCell={activeCell}
				onTableBodyClick={handleTableClick}
			/>
			{activeModal}
		</ModalContext.Provider>
	);
}

export default Editor;
