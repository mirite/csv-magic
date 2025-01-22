import React, { type ReactElement, useCallback, useState } from "react";

import type { Modal, Table } from "types";

import Chrome from "../Chrome/Chrome";
import TableComponent from "../Table/TableComponent";

import { useFileStore } from "modules/useFileStore";

/**
 * The main editor component. Contains the table and the chrome.
 *
 * @returns The editor component.
 */
function Editor(): ReactElement {
	const [activeModal, setActiveModal] = useState<undefined | Modal>(undefined);
	const [activeCell, setActiveCell] = useState(
		useFileStore().currentFile()?.table.firstCellId,
	);
	const { setCoreState } = useFileStore();
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

	const handleModalClose = (changedTable?: Table) => {
		if (changedTable) {
			setCoreState(changedTable);
		}
		setActiveModal(undefined);
	};

	return (
		<>
			<Chrome />
			<TableComponent
				activeCell={activeCell}
				onTableBodyClick={handleTableClick}
			/>
			{activeModal}
		</>
	);
}

export default Editor;
