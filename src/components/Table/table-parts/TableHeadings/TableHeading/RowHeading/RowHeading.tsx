import type { FunctionComponent, ReactElement } from "react";
import React from "react";

import type { RowAction } from "../../../../../Editor/Editor";
import * as styles from "../TableHeading.module.css";

interface RowHeadingProps {
	onAction: (actionName: RowAction) => void;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (
	props,
): ReactElement => {
	const { onAction } = props;
	return (
		<th className={styles.cell} scope="row">
			<div className={styles.rowHeading}>
				<button
					className={styles.button}
					onClick={() => onAction("duplicate")}
					type={"button"}
				>
					Duplicate
				</button>
				<button
					className={styles.buttonDanger}
					onClick={() => onAction("delete")}
					type={"button"}
				>
					Delete
				</button>
			</div>
		</th>
	);
};

export default RowHeading;
