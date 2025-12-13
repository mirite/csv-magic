import type { ReactElement } from "react";
import React from "react";

import styles from "../AddColumnOptions.module.css";

interface StaticOptionsProps {
	onChange: (e: string) => void;
}

const StaticOptions = (props: StaticOptionsProps): ReactElement => {
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
			/>
		</div>
	);
};

export default StaticOptions;
