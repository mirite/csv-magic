import type { FunctionComponent } from "react";

import styles from "./TableHeading.module.css";
import type { Row, RowAction } from "@/types.js";
import { rowActions } from "@/lib/index.js";

interface RowHeadingProps {
	onAction: (row: Row, actionName: RowAction) => unknown;
	row: Row;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (props) => {
	const { onAction, row } = props;
	return (
		<th className={styles.cell} scope="row">
			<div className={styles.rowHeading}>
				<button
					className={styles.button}
					onClick={() => onAction(row, rowActions.duplicate)}
					type={"button"}
				>
					Duplicate
				</button>
				<button
					className={styles.buttonDanger}
					onClick={() => onAction(row, rowActions.delete)}
					type={"button"}
				>
					Delete
				</button>
			</div>
		</th>
	);
};

export default RowHeading;
