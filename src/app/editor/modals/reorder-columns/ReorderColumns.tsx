import { reorderColumns } from "@/lib/index.js";
import type { ReactElement } from "react";
import { useState } from "react";

import type { ChildModalProps } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import ColumnPosition from "./ColumnPosition.js";
import styles from "./ReorderColumnsModal.module.css";

export const ReorderColumns = (props: ChildModalProps): ReactElement => {
	const { onClose, table } = props;
	const [columns, setColumns] = useState(table.columns);

	const handleChange = (initialIndex: number, distance: number) => {
		setColumns((prev) => {
			const newIndex = initialIndex + distance;
			const newOrder = [...prev];
			const columnToMove = newOrder[initialIndex];
			newOrder.splice(initialIndex, 1);
			newOrder.splice(newIndex, 0, columnToMove);
			return newOrder;
		});
	};

	const handleApply = () => {
		const ids = columns.map(({ id }) => id);
		const newTable = reorderColumns(table, ids);
		onClose(newTable);
	};

	return (
		<Modal
			applyText="Reorder Columns"
			onApply={handleApply}
			title="Reorder Columns"
			{...props}
		>
			<div className={styles.list}>
				{columns.map((column, index) => (
					<ColumnPosition
						key={column.id}
						onMove={(distance) => handleChange(index, distance)}
						toEnd={columns.length - 1 - index}
						toStart={-1 * index}
						value={column}
					/>
				))}
			</div>
		</Modal>
	);
};
