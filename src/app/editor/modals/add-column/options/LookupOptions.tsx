import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import type { MappedColumn } from "@/types.js";

import KeyInFileSelector from "../KeyInFileSelector.js";
import OpenFileSelector from "../OpenFileSelector.js";
import type { AddColumnComponentProps } from "../types.js";

const LookupOptions = (
	props: AddColumnComponentProps<MappedColumn>,
): ReactElement => {
	const { onChange, value } = props;

	const activeFile = useFileStore();
	const currentFile = activeFile.currentFile();
	if (!currentFile?.table) {
		return <p>No file active</p>;
	}

	return (
		<div>
			<OpenFileSelector
				currentFile={currentFile}
				onChange={(key) => onChange({ ...value, foreignTable: key.table })}
			/>
			<KeyInFileSelector
				label="Key in this table to match on:"
				onChange={(key) => onChange({ ...value, sourceMatchID: key })}
				table={currentFile.table}
				value={value.sourceMatchID}
			/>
			{value.foreignTable ? (
				<div>
					<KeyInFileSelector
						label="Key in the other table to match on:"
						onChange={(key) => onChange({ ...value, foreignMatchID: key })}
						table={value.foreignTable}
						value={value.foreignMatchID}
					/>
					<KeyInFileSelector
						label="Key in the other table to import:"
						onChange={(key) => onChange({ ...value, foreignImportID: key })}
						table={value.foreignTable}
						value={value.foreignImportID}
					/>
				</div>
			) : (
				<p>Please select a file.</p>
			)}
		</div>
	);
};

export default LookupOptions;
