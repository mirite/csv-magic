import React, { FunctionComponent } from 'react';
import styles from 'styles/chrome/UndoRedo.module.css';

interface UndoRedoProps {}

const UndoRedo: FunctionComponent<UndoRedoProps> = () => {
	return (
		<div className={styles.container}>
			<button className={styles.button} disabled={true}>
				Undo
			</button>
			<button className={styles.button} disabled={true}>
				Redo
			</button>
		</div>
	);
};

export default UndoRedo;
