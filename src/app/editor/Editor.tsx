import { ModalContext, Sorting, useFileStore } from "@/lib/index.js";
import { type ReactElement, useCallback, useMemo, useState } from "react";
import type { Modal, RowActionHandler, Sorts, Table } from "@/types.js";

import Chrome from "./chrome/Chrome.js";
import TableComponent from "./table/TableComponent.js";

/**
 * The main editor component. Contains the table and the chrome.
 *
 * @returns The editor component.
 */
export function Editor(): ReactElement {
	const { currentFile, updateCurrentFile } = useFileStore();
	const file = currentFile()!; //Main makes sure this is not null before calling Editor.

	const { table } = file;

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

	const setCoreState = useCallback(
		(newTable: Table, newSorts?: Sorts) => {
			const current = currentFile();
			if (!current) return;

			const { activeSorts: currentSorts, history } = current;
			const newHistory = [...history, current.table];

			updateCurrentFile(newTable, newSorts || currentSorts, newHistory);
		},
		[currentFile, updateCurrentFile],
	);
	const handleSort = useCallback(
		(columnID: number) => {
			const current = currentFile();
			if (!current) return;

			const newSorts = Sorting.setSort(current.activeSorts, columnID);
			const newData = Sorting.applySorting(current.table, newSorts);

			setCoreState(newData, newSorts);
		},
		[currentFile, setCoreState],
	);

	const handleRowAction = useCallback<RowActionHandler>(
		(row, action) => {
			const current = currentFile();
			if (!current) return;

			const newTable = action(current.table, row);
			setCoreState(newTable);
		},
		[currentFile, setCoreState],
	);

	const modalContext = useMemo(() => {
		const handleModalClose = (changedTable?: Table) => {
			if (changedTable) {
				setCoreState(changedTable);
			}
			setActiveModal(undefined);
		};
		return { onClose: handleModalClose, setActiveModal, table };
	}, [setActiveModal, setCoreState, table]);

	return (
		<ModalContext.Provider value={modalContext}>
			<Chrome onTableChange={setCoreState} />
			<TableComponent
				activeCell={activeCell}
				onRowAction={handleRowAction}
				onSort={handleSort}
				onTableBodyClick={handleTableClick}
				onTableChange={setCoreState}
			/>
			{activeModal}
		</ModalContext.Provider>
	);
}
