import { renameColumn } from "modules/editing";
import type { ReactElement } from "react";
import React, { useId, useState } from "react";
import type { Column } from "types";

import type { BaseModalProps } from "../BaseModal/Modal";
import Modal from "../BaseModal/Modal";
import * as styles from "./RenameColumn.module.css";

interface IProps extends BaseModalProps {
	column: Column;
}

const RenameColumnModal = (props: IProps): ReactElement => {
	const { column, table, onClose } = props;
	const [newName, setNewName] = useState<string>("");

	const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setNewName(value);
	};

	const handleApply = () => {
		const changedTable = renameColumn(table, column.id, newName.trim());
		onClose(changedTable);
	};

	const id = useId();

	const options: React.ComponentProps<typeof Modal> = {
		title: "Rename Column",
		applyText: "Rename",
		onApply: handleApply,
		isValid: newName.trim() !== "",
		...props,
	};

	return (
		<Modal {...options}>
			<div>
				<p>Renaming &quot;{column.label}&quot;</p>
				<div className={styles.container}>
					<div className={styles.group}>
						<label htmlFor={id}>New Name:</label>
						<input
							id={id}
							className={styles.input}
							type="text"
							value={newName}
							onChange={handleNewNameChange}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default RenameColumnModal;
