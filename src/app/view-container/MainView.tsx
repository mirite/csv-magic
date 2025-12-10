import type { ReactElement } from "react";

import { useFileStore } from "@/lib/index.js";
import { Editor } from "@/app/editor/index.js";
import { FileSelector } from "@/app/file-selector/index.js";

/**
 * A pane for a file. Shows the open file dialog if there isn't a file yet, or
 * the file if there is.
 *
 * @returns The main view component.
 */
function MainView(): ReactElement {
	const { currentFile } = useFileStore();

	return <div>{currentFile() ? <Editor /> : <FileSelector />}</div>;
}

export default MainView;
