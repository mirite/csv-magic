import { faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FunctionComponent } from "react";
import React, { useState } from "react";
import type { FileHistory, Table } from "types";

import styles from "./UndoRedo.module.css";

interface UndoRedoProps {
	history: FileHistory;
	onTableChange: (table: Table) => void;
}

const UndoRedo: FunctionComponent<UndoRedoProps> = (props) => {
	const [historyIndex, setHistoryIndex] = useState(0);

	const isUndoDisabled = () => {
		return historyIndex === props.history.length;
	};

	const isRedoDisabled = () => {
		return historyIndex === 0;
	};

	const timeTravel = (movement: number) => {
		setHistoryIndex(historyIndex + movement);
		props.onTableChange(props.history[historyIndex]);
	};

	return (
		<div>
			<button
				className={styles.button}
				disabled={isUndoDisabled()}
				onClick={() => timeTravel(1)}
			>
				<FontAwesomeIcon icon={faUndo} />
			</button>
			<button
				className={styles.button}
				disabled={isRedoDisabled()}
				onClick={() => timeTravel(-1)}
			>
				<FontAwesomeIcon icon={faRedo} />
			</button>
		</div>
	);
};

export default UndoRedo;
