import { useFileStore } from "modules/useFileStore";
import type { ReactElement } from "react";
import React from "react";
import type { Table } from "types";

import * as styles from "./Chrome.module.css";
import SaveAsField from "./SaveAsField/SaveAsField";
import SuperTools from "./SuperTools/SuperTools";
import UndoRedo from "./UndoRedo/UndoRedo";

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
