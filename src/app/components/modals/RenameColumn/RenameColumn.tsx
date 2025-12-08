import { renameColumn } from "@/lib/index.js";
import type { ChangeEvent, ReactElement } from "react";
import React, { useId, useState } from "react";

import type { ChildModalPropsWithColumn } from "../BaseModal/Modal.js";
import { Modal } from "../BaseModal/Modal.js";

import * as styles from "./RenameColumn.module.css";

export const RenameColumn = (
	props: ChildModalPropsWithColumn,
): ReactElement => {
	const { column, onClose, table } = props;
	const [newName, setNewName] = useState<string>("");

	const handleNewNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setNewName(value);
	};

	const handleApply = () => {
		const changedTable = renameColumn(table, column.id, newName.trim());
		onClose(changedTable);
	};

	const id = useId();

	const options: React.ComponentProps<typeof Modal> = {
		...props,
		applyText: "Rename",
		isValid: newName.trim() !== "",
		onApply: handleApply,
		title: "Rename Column",
	};

	return (
		<Modal {...options}>
			<div>
				<p>Renaming &quot;{column.label}&quot;</p>
				<div className={styles.container}>
					<div className={styles.group}>
						<label htmlFor={id}>New Name:</label>
						<input
							className={styles.input}
							id={id}
							onChange={handleNewNameChange}
							type="text"
							value={newName}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};
