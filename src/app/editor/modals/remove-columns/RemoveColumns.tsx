import { removeColumns } from "@/lib/index.js";
import type { ReactElement } from "react";
import { useState } from "react";
import type { Column } from "@/types.js";

import type { ChildModalProps } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import ColumnValue from "./ColumnValue.js";
import styles from "./RemoveColumnsModal.module.css";

export const RemoveColumns = (props: ChildModalProps): ReactElement => {
	const { onClose, table } = props;
	const columns = table.columns;
	const [columnsState, setColumnsState] = useState<Array<[Column, boolean]>>(
		columns.map((label) => [label, false]),
	);

	const handleChange = (column: Column, status: boolean) => {
		const newColumns = [...columnsState];
		const index = newColumns.findIndex((pair) => pair[0].id === column.id);
		if (index === -1) {
			return;
		}
		newColumns[index][1] = status;
		setColumnsState(newColumns);
	};

	const columnsToDelete = columnsState
		.filter((pair) => pair[1])
		.map((pair) => pair[0]);

	const handleApply = () => {
		const newTable = removeColumns(table, columnsToDelete);
		onClose(newTable);
	};

	return (
		<Modal
			{...props}
			applyText="Remove Selected Columns"
			isValid={columnsToDelete.length > 0}
			onApply={handleApply}
			title="Remove Columns"
		>
			<ul className={styles.list}>
				{columnsState.map((pair) => (
					<ColumnValue
						key={pair[0].id}
						onChange={handleChange}
						value={pair[0]}
					/>
				))}
			</ul>
		</Modal>
	);
};
