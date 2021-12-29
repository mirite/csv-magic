import React, { FunctionComponent } from 'react';
import { IEditorState } from '../Editor';
import SaveAsField from './SaveAsField';

interface ChromeProps {
	editorState: IEditorState;
}

const Chrome: FunctionComponent<ChromeProps> = (props) => {
	return <SaveAsField table={props.editorState.activeData} />;
};

export default Chrome;
