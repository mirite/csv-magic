import React, { FunctionComponent, useState } from 'react';
import { IFileHistory } from 'types';
import styles from 'styles/chrome/UndoRedo.module.css';

interface UndoRedoProps {
	history: IFileHistory;
	onTableChange: Function;
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
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={isUndoDisabled()}
				onClick={() => timeTravel(1)}
			>
				Undo
			</button>
			<button
				className={styles.button}
				disabled={isRedoDisabled()}
				onClick={() => timeTravel(-1)}
			>
				Redo
			</button>
		</div>
	);
};

export default UndoRedo;
