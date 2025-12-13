import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import type { MappedColumn } from "@/types.js";

import KeyInFileSelector from "../KeyInFileSelector.js";
import OpenFileSelector from "../OpenFileSelector.js";

interface LookupOptionsProps {
	onChange: (e: MappedColumn) => void;
	state: MappedColumn;
}

const LookupOptions = (props: LookupOptionsProps): ReactElement => {
	const { onChange, state } = props;

	const activeFile = useFileStore();
	const currentFile = activeFile.currentFile();
	if (!currentFile?.table) {
		return <p>No file active</p>;
	}

	return (
		<div>
			<OpenFileSelector
				currentFile={currentFile}
				onChange={(key) => onChange({ ...state, foreignTable: key.table })}
			/>
			<KeyInFileSelector
				label="Key in this table to match on:"
				onChange={(key) => onChange({ ...state, sourceMatchID: key })}
				table={currentFile.table}
				value={state.sourceMatchID}
			/>
			{state.foreignTable ? (
				<div>
					<KeyInFileSelector
						label="Key in the other table to match on:"
						onChange={(key) => onChange({ ...state, foreignMatchID: key })}
						table={state.foreignTable}
						value={state.foreignMatchID}
					/>
					<KeyInFileSelector
						label="Key in the other table to import:"
						onChange={(key) => onChange({ ...state, foreignImportID: key })}
						table={state.foreignTable}
						value={state.foreignImportID}
					/>
				</div>
			) : (
				<p>Please select a file.</p>
			)}
		</div>
	);
};

export default LookupOptions;
