import type { FunctionComponent } from "react";

import styles from "./TableHeading.module.css";
import type { RowAction } from "@/types.js";
import { rowActions } from "@/lib/row-actions.js";

interface RowHeadingProps {
	onAction: (actionName: RowAction) => void;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (props) => {
	const { onAction } = props;
	return (
		<th className={styles.cell} scope="row">
			<div className={styles.rowHeading}>
				<button
					className={styles.button}
					onClick={() => onAction(rowActions.duplicate)}
					type={"button"}
				>
					Duplicate
				</button>
				<button
					className={styles.buttonDanger}
					onClick={() => onAction(rowActions.delete)}
					type={"button"}
				>
					Delete
				</button>
			</div>
		</th>
	);
};

export default RowHeading;
