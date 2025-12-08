import { type supportedFileTypes, CSVSaver } from "@/lib/index.js";
import type { FormEvent, FunctionComponent } from "react";
import React, { useState } from "react";
import type { Table } from "@/types.js";

import * as styles from "./SaveAsField.module.css";

interface SaveAsFieldProps {
	table: Table;
}

const SaveAsField: FunctionComponent<SaveAsFieldProps> = (props) => {
	const [fileName, setFileName] = useState("");
	const [fileType, setFileType] = useState<supportedFileTypes>("csv");

	const saveTable = (e: FormEvent) => {
		e.preventDefault();
		CSVSaver(props.table, fileType, fileName);
	};

	return (
		<div>
			<form className={styles.container} onSubmit={(e) => saveTable(e)}>
				<input
					className={styles.input}
					id="input-fileName"
					onChange={(e) => setFileName(e.target.value)}
					placeholder="File Name"
					type="text"
					value={fileName}
				/>
				<select
					className={styles.input}
					onChange={(e) => setFileType(e.target.value as supportedFileTypes)}
					value={fileType}
				>
					<option value="csv">.csv</option>
					<option value="json">.json</option>
					<option value="sql">.sql (Experimental)</option>
				</select>
				<button className={styles.button} type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default SaveAsField;
