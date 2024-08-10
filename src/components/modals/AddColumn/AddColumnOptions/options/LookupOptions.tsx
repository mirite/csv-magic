import { useFileStore } from "modules/useFileStore";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import type { File, MappedColumn } from "types";

import KeyInFileSelector from "../KeyInFileSelector";
import OpenFileSelector from "../OpenFileSelector";

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
			foreignTable,
			sourceMatchID: sourceMatchKey,
			foreignMatchID: foreignMatchKey,
			foreignImportID: foreignImportKey,
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
					table={otherFile?.table}
					label="Key in the other table to match on:"
					onChange={(key) => setForeignMatchKey(key)}
				/>
				<KeyInFileSelector
					table={otherFile?.table}
					label="Key in the other table to import:"
					onChange={(key) => setForeignImportKey(key)}
				/>
			</div>
		);
	};
	return (
		<div>
			<OpenFileSelector
				onChange={(e: File) => setOtherFile(e)}
				currentFile={currentFile}
			/>
			<KeyInFileSelector
				table={currentFile.table}
				label="Key in this table to match on:"
				onChange={(key) => setSourceMatchKey(key)}
			/>
			{otherFileKeySelector()}
		</div>
	);
};

export default LookupOptions;
