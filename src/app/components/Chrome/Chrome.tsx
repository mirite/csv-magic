import { useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import type { Table } from "@/types.js";

import styles from "./Chrome.module.css";
import SaveAsField from "./SaveAsField/SaveAsField.js";
import SuperTools from "./SuperTools/SuperTools.js";
import UndoRedo from "./UndoRedo/UndoRedo.js";

interface ChromeProps {
	onTableChange: (table: Table) => void;
}

const Chrome = (props: ChromeProps): ReactElement => {
	const file = useFileStore().currentFile();
	if (!file) {
		return <p>No file active</p>;
	}
	return (
		<div className={styles.container}>
			<UndoRedo history={file.history} onTableChange={props.onTableChange} />
			<SuperTools />
			<SaveAsField table={file.table} />
		</div>
	);
};

export default Chrome;
