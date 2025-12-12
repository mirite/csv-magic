import { faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FunctionComponent } from "react";
import { useState } from "react";
import type { FileHistory, Table } from "@/types.js";

import styles from "./UndoRedo.module.css";

interface UndoRedoProps {
	history: FileHistory;
	onTableChange: (table: Table) => void;
}

const UndoRedo: FunctionComponent<UndoRedoProps> = (props) => {
	const { history, onTableChange } = props;
	const [historyIndex, setHistoryIndex] = useState(0);

	const timeTravel = (movement: number) => {
		setHistoryIndex(historyIndex + movement);
		onTableChange(history[historyIndex]);
	};

	return (
		<div>
			<button
				className={styles.button}
				disabled={historyIndex === history.length}
				onClick={() => timeTravel(1)}
				type={"button"}
			>
				<FontAwesomeIcon icon={faUndo} />
			</button>
			<button
				className={styles.button}
				disabled={historyIndex === 0}
				onClick={() => timeTravel(-1)}
				type={"button"}
			>
				<FontAwesomeIcon icon={faRedo} />
			</button>
		</div>
	);
};

export default UndoRedo;
