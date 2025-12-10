import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import KeyInFileSelector from "../KeyInFileSelector.js";

interface LookupOptionsProps {
	onChange: (e: number) => void;
}

const DuplicateOptions = (props: LookupOptionsProps): ReactElement => {
	const { onChange } = props;
	const [columnIDToDuplicate, setColumnIDToDuplicate] = useState<number>();

	const activeFile = useFileStore();
	const currentFile = activeFile.currentFile();
	useEffect(() => {
		if (!columnIDToDuplicate) {
			return;
		}

		onChange(columnIDToDuplicate);
	}, [columnIDToDuplicate, onChange]);

	if (!currentFile?.table) {
		return <p>No file active</p>;
	}

	return (
		<div>
			<KeyInFileSelector
				label="Key in this table to duplicate:"
				onChange={(key) => setColumnIDToDuplicate(key)}
				table={currentFile.table}
			/>
		</div>
	);
};

export default DuplicateOptions;
