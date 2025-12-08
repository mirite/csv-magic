import { deleteRow, duplicateRow, Sorting, useFileStore } from "@/lib/index.js";
import { createContext, type ReactElement, useCallback, useState } from "react";
import type { Modal, Row, Sorts, Table } from "@/types.js";

import Chrome from "../Chrome/Chrome.js";
import TableComponent from "../Table/TableComponent.js";

export type ModalContextType = {
	onClose: (changedTable?: Table) => void;
	setActiveModal: (modal: Modal) => void;
	table: Table;
};

const rowActions = {
	delete: deleteRow,
	duplicate: duplicateRow,
};

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

	const { activeSorts, history, table } = file;

	const [activeModal, setActiveModal] = useState<Modal | undefined>(undefined);
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

	const modalContext = { onClose: handleModalClose, setActiveModal, table };
	ModalContext = createContext<ModalContextType>(modalContext);

	return (
		<ModalContext.Provider value={modalContext}>
			<Chrome onTableChange={(e: Table) => setCoreState(e)} />
			<TableComponent
				activeCell={activeCell}
				onRowAction={(action, row) => handleRowAction(action, row)}
				onSort={(e) => handleSort(e)}
				onTableBodyClick={handleTableClick}
				onTableChange={(e: Table) => setCoreState(e)}
			/>
			{activeModal}
		</ModalContext.Provider>
	);
}

export default Editor;
