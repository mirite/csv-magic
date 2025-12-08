import { removeColumns } from "@/lib/index.js";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { Column } from "@/types.js";

import type { ChildModalProps } from "../BaseModal/Modal.js";
import { Modal } from "../BaseModal/Modal.js";

import ColumnValue from "./ColumnValue/ColumnValue.js";
import styles from "./RemoveColumnsModal.module.css";

export const RemoveColumns = (props: ChildModalProps): ReactElement => {
	const { onClose, table } = props;
	const columns = table.columns;
	const [columnsState, setColumnsState] = useState<Array<[Column, boolean]>>(
		columns.map((label) => [label, false]),
	);

	const handleChange = (column: Column, status: boolean): void => {
		const newColumns = [...columnsState];
		const index = newColumns.findIndex((pair) => pair[0].id === column.id);
		if (index !== -1) {
			newColumns[index][1] = status;
			setColumnsState(newColumns);
		}
	};

	const getColumnsToDelete = () => {
		return columnsState.filter((pair) => pair[1]).map((pair) => pair[0]);
	};

	const handleApply = () => {
		const columnsToDelete = getColumnsToDelete();
		const newTable = removeColumns(table, columnsToDelete);
		onClose(newTable);
	};

	const options: React.ComponentProps<typeof Modal> = {
		...props,
		applyText: "Remove Selected Columns",
		isValid: getColumnsToDelete().length > 0,
		onApply: handleApply,
		title: "Remove Columns",
	};

	return (
		<Modal {...options}>
			<ul className={styles.list}>
				{columnsState.map((pair) => (
					<ColumnValue
						key={pair[0].id}
						onChange={(value: Column, status: boolean) =>
							handleChange(value, status)
						}
						value={pair[0]}
					/>
				))}
			</ul>
		</Modal>
	);
};
