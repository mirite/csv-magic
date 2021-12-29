import React, { FunctionComponent } from 'react';
import { IEditorState } from '../Editor';
import SaveAsField from './SaveAsField';
import UndoRedo from './UndoRedo';
import styles from 'styles/chrome/Chrome.module.css';
import SuperTools from './SuperTools';

interface ChromeProps {
	editorState: IEditorState;
}

const Chrome: FunctionComponent<ChromeProps> = (props) => {
	return (
		<div className={styles.container}>
			<UndoRedo />
			<SuperTools />
			<SaveAsField table={props.editorState.activeData} />
		</div>
	);
};

export default Chrome;
