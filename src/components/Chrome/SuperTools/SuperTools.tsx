import {
	faMinusSquare,
	faPlusSquare,
	faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";

import { ModalContext } from "../../Editor/Editor";
import AddColumn from "../../modals/AddColumn/AddColumn";
import RemoveColumns from "../../modals/RemoveColumns/RemoveColumns";
import ReorderColumns from "../../modals/ReorderColumns/ReorderColumns";

import * as styles from "./SuperTools.module.css";

const SuperTools = () => {
	const { setActiveModal, onClose, table } = useContext(ModalContext);
	return (
		<div>
			<button
				className={styles.remove}
				onClick={() =>
					setActiveModal(<RemoveColumns onClose={onClose} table={table} />)
				}
				title="Remove Columns"
			>
				<FontAwesomeIcon icon={faMinusSquare} />
				&nbsp;Remove Columns
			</button>
			<button
				className={styles.add}
				onClick={() =>
					setActiveModal(<AddColumn onClose={onClose} table={table} />)
				}
				title="Add Column"
			>
				<FontAwesomeIcon icon={faPlusSquare} />
				&nbsp;Generate Column
			</button>
			<button
				className={styles.add}
				onClick={() =>
					setActiveModal(<ReorderColumns onClose={onClose} table={table} />)
				}
				title="Reorder Columns"
			>
				<FontAwesomeIcon icon={faRandom} />
				&nbsp;Reorder Columns
			</button>
		</div>
	);
};

export default SuperTools;
