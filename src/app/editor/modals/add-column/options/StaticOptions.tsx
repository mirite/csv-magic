import type { ReactElement } from "react";

import styles from "../AddColumnOptions.module.css";
import type { AddColumnComponentProps } from "../types.js";

const StaticOptions = (
	props: AddColumnComponentProps<string>,
): ReactElement => {
	return (
		<div>
			<label className={styles.label} htmlFor="static-option">
				Static Value:
			</label>
			<input
				className={styles.input}
				id="static-option"
				onChange={(e) => props.onChange(e.target.value)}
				type="text"
				value={props.value}
			/>
		</div>
	);
};

export default StaticOptions;
