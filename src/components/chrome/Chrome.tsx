import React, { FunctionComponent } from 'react';
import SaveAsField from './SaveAsField';
import UndoRedo from './UndoRedo';
import styles from 'styles/chrome/Chrome.module.css';
import SuperTools from './SuperTools';
import { IEditorState } from 'types';

interface ChromeProps {
	editorState: IEditorState;
	onTableChange: Function;
}

const Chrome: FunctionComponent<ChromeProps> = (props) => {
	return (
		<div className={styles.container}>
			<UndoRedo
				history={props.editorState.history}
				onTableChange={props.onTableChange}
			/>
			<SuperTools />
			<SaveAsField table={props.editorState.activeData} />
		</div>
	);
};

export default Chrome;
