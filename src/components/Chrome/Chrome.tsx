import React, { FunctionComponent } from 'react';
import SaveAsField from './SaveAsField/SaveAsField';
import UndoRedo from './UndoRedo/UndoRedo';
import styles from 'components/Chrome/Chrome.module.css';
import SuperTools from './SuperTools/SuperTools';
import { IFile } from 'types';

interface ChromeProps {
	editorState: IFile;
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
			<SaveAsField table={props.editorState.table} />
		</div>
	);
};

export default Chrome;
