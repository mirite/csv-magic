import { reorderColumns } from "@/lib/index.js";
import type { ComponentProps, ReactElement } from "react";
import { useState } from "react";
import type { Column } from "@/types.js";

import type { ChildModalProps } from "../BaseModal/Modal.js";
import { Modal } from "../BaseModal/Modal.js";

import ColumnPosition from "./ColumnPosition/ColumnPosition.js";
import * as styles from "./ReorderColumnsModal.module.css";

export const ReorderColumns = (props: ChildModalProps): ReactElement => {
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
		...props,
		applyText: "Reorder Columns",
		onApply: handleApply,
		title: "Reorder Columns",
	};

	return (
		<Modal {...options}>
			<div className={styles.list}>
				{columns.map((column, index) => (
					<ColumnPosition
						key={column.id}
						onMove={(distance: number) => handleChange(index, distance)}
						toEnd={columns.length - 1 - index}
						toStart={-1 * index}
						value={column}
					/>
				))}
			</div>
		</Modal>
	);
};
