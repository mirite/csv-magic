import {
	faMinusSquare,
	faPlusSquare,
	faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { useContext } from "react";

import { ModalContext } from "@/lib/index.js";
import { modals } from "@/app/editor/modals/index.js";

import styles from "./SuperTools.module.css";

const SuperTools = (): ReactElement => {
	const { onClose, setActiveModal, table } = useContext(ModalContext);
	return (
		<div>
			<button
				className={styles.remove}
				onClick={() =>
					setActiveModal(
						<modals.RemoveColumns onClose={onClose} table={table} />,
					)
				}
				title="Remove Columns"
				type={"button"}
			>
				<FontAwesomeIcon icon={faMinusSquare} />
				&nbsp;Remove Columns
			</button>
			<button
				className={styles.add}
				onClick={() =>
					setActiveModal(<modals.AddColumn onClose={onClose} table={table} />)
				}
				title="Add Column"
				type={"button"}
			>
				<FontAwesomeIcon icon={faPlusSquare} />
				&nbsp;Generate Column
			</button>
			<button
				className={styles.add}
				onClick={() =>
					setActiveModal(
						<modals.ReorderColumns onClose={onClose} table={table} />,
					)
				}
				title="Reorder Columns"
				type={"button"}
			>
				<FontAwesomeIcon icon={faRandom} />
				&nbsp;Reorder Columns
			</button>
		</div>
	);
};

export default SuperTools;
