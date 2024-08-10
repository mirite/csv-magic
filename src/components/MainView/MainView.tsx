import React from "react";

import { useFileStore } from "../../modules/useFileStore";
import Editor from "../Editor/Editor";
import FileSelector from "../FileSelector/FileSelector";

/**
 * A pane for a file. Shows the open file dialog if there isn't a file yet, or
 * the file if there is.
 */
function MainView() {
	const { currentFile } = useFileStore();

	return <div>{currentFile() ? <Editor /> : <FileSelector />}</div>;
}

export default MainView;
