import type { ComponentProps, ReactElement } from "react";
import React, { useState } from "react";

import { reorderColumns } from "modules/reordering";
import type { Column } from "types";

import type { BaseModalProps } from "../BaseModal/Modal";
import Modal from "../BaseModal/Modal";

import ColumnPosition from "./ColumnPosition/ColumnPosition";
import * as styles from "./ReorderColumnsModal.module.css";

const ReorderColumnsModal = (props: BaseModalProps): ReactElement => {
	const { table } = props;
	const originalColumns = table.columns;
	const [columns, setColumns] = useState<Column[]>(originalColumns);

	const handleChange = (initialIndex: number, distance: number) => {
		const newIndex = initialIndex + distance;
		const newOrder = [...columns];
		const columnToMove = newOrder[initialIndex];
		newOrder.splice(initialIndex, 1);
		newOrder.splice(newIndex, 0, columnToMove);
		setColumns(newOrder);
	};

	const handleApply = (): void => {
		const ids = columns.map((column: Column) => column.id);
		const newTable = reorderColumns(table, ids);
		props.onClose(newTable);
	};

	const options: ComponentProps<typeof Modal> = {
		title: "Reorder Columns",
		applyText: "Reorder Columns",
		onApply: handleApply,
		...props,
	};

	return (
		<Modal {...options}>
			<div className={styles.list}>
				{columns.map((column, index) => (
					<ColumnPosition
						key={column.id}
						value={column}
						onMove={(distance: number) => handleChange(index, distance)}
						toStart={-1 * index}
						toEnd={columns.length - 1 - index}
					/>
				))}
			</div>
		</Modal>
	);
};

export default ReorderColumnsModal;
