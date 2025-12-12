import { type supportedFileTypes, CSVSaver } from "@/lib/index.js";
import type { FormEvent, FunctionComponent } from "react";
import { useState } from "react";
import type { Table } from "@/types.js";

import styles from "./SaveAsField.module.css";

interface SaveAsFieldProps {
	table: Table;
}

const SaveAsField: FunctionComponent<SaveAsFieldProps> = (props) => {
	const [state, setState] = useState<{
		fileName: string;
		fileType: supportedFileTypes;
	}>({ fileName: "", fileType: "csv" });

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		CSVSaver(props.table, state.fileType, state.fileName);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				id="input-fileName"
				onChange={(e) =>
					setState((prev) => ({ ...prev, fileName: e.target.value }))
				}
				placeholder="File Name"
				type="text"
				value={state.fileName}
			/>
			<select
				className={styles.input}
				onChange={(e) =>
					setState((prev) => ({
						...prev,
						fileType: e.target.value as supportedFileTypes,
					}))
				}
				value={state.fileType}
			>
				<option value="csv">.csv</option>
				<option value="json">.json</option>
				<option value="sql">.sql (Experimental)</option>
			</select>
			<button className={styles.button} type="submit">
				Save
			</button>
		</form>
	);
};

export default SaveAsField;
