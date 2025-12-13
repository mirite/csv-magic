import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";

import KeyInFileSelector from "../KeyInFileSelector.js";
import type { AddColumnComponentProps } from "../types.js";

const DuplicateOptions = (
	props: AddColumnComponentProps<number>,
): ReactElement => {
	const { onChange, value } = props;

	const activeFile = useFileStore();
	const currentFile = activeFile.currentFile();

	if (!currentFile?.table) {
		return <p>No file active</p>;
	}

	return (
		<KeyInFileSelector
			label="Key in this table to duplicate:"
			onChange={onChange}
			table={currentFile.table}
			value={value}
		/>
	);
};

export default DuplicateOptions;
