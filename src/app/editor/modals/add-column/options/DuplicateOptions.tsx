import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";

import KeyInFileSelector from "../KeyInFileSelector.js";

interface LookupOptionsProps {
	onChange: (e: number) => void;
}

const DuplicateOptions = (props: LookupOptionsProps): ReactElement => {
	const { onChange } = props;

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
		/>
	);
};

export default DuplicateOptions;
