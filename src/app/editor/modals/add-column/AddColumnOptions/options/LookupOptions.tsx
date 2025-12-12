import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import type { File, MappedColumn } from "@/types.js";

import KeyInFileSelector from "../KeyInFileSelector.js";
import OpenFileSelector from "../OpenFileSelector.js";

interface LookupOptionsProps {
	onChange: (e: MappedColumn) => void;
}

const LookupOptions = (props: LookupOptionsProps): ReactElement => {
	const { onChange } = props;
	const [otherFile, setOtherFile] = useState<File>();
	const [sourceMatchKey, setSourceMatchKey] = useState<number>();
	const [foreignMatchKey, setForeignMatchKey] = useState<number>();
	const [foreignImportKey, setForeignImportKey] = useState<number>();

	const activeFile = useFileStore();
	useEffect(() => {
		const foreignTable = otherFile?.table;
		if (
			!foreignTable ||
			!sourceMatchKey ||
			!foreignMatchKey ||
			!foreignImportKey
		) {
			return;
		}
		const mappedColumn: MappedColumn = {
			foreignImportID: foreignImportKey,
			foreignMatchID: foreignMatchKey,
			foreignTable,
			sourceMatchID: sourceMatchKey,
		};
		onChange(mappedColumn);
	}, [foreignMatchKey, sourceMatchKey, otherFile, foreignImportKey, onChange]);
	const currentFile = activeFile.currentFile();
	if (!currentFile || !currentFile?.table) {
		return <p>No file active</p>;
	}

	const otherFileKeySelector = () => {
		if (!otherFile?.table) {
			return <p>Please select a file.</p>;
		}
		return (
			<div>
				<KeyInFileSelector
					label="Key in the other table to match on:"
					onChange={(key) => setForeignMatchKey(key)}
					table={otherFile?.table}
				/>
				<KeyInFileSelector
					label="Key in the other table to import:"
					onChange={(key) => setForeignImportKey(key)}
					table={otherFile?.table}
				/>
			</div>
		);
	};
	return (
		<div>
			<OpenFileSelector
				currentFile={currentFile}
				onChange={(e: File) => setOtherFile(e)}
			/>
			<KeyInFileSelector
				label="Key in this table to match on:"
				onChange={(key) => setSourceMatchKey(key)}
				table={currentFile.table}
			/>
			{otherFileKeySelector()}
		</div>
	);
};

export default LookupOptions;
