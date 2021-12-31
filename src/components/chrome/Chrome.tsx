import React, { FunctionComponent } from 'react';
import SaveAsField from './SaveAsField';
import UndoRedo from './UndoRedo';
import styles from 'styles/chrome/Chrome.module.css';
import SuperTools from './SuperTools';
import { IEditorState, IEditorStateAndTable } from 'types';

interface ChromeProps {
	editorState: IEditorStateAndTable;
	onTableChange: Function;
	onSetActiveModal: (arg0: string) => any;
}

const Chrome: FunctionComponent<ChromeProps> = (props) => {
	return (
		<div className={styles.container}>
			<UndoRedo
				history={props.editorState.history}
				onTableChange={props.onTableChange}
			/>
			<SuperTools onSetActiveModal={props.onSetActiveModal} />
			<SaveAsField table={props.editorState.activeData} />
		</div>
	);
};

export default Chrome;
