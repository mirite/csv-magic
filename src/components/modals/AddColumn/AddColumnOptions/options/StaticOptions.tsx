import type { ReactElement } from "react";
import React from "react";

import * as styles from "../AddColumnOptions.module.css";

interface StaticOptionsProps {
	onChange: (e: string) => void;
}

const StaticOptions = (props: StaticOptionsProps): ReactElement => {
	return (
		<div>
			<label htmlFor="static-option" className={styles.label}>
				Static Value:
			</label>
			<input
				type="text"
				className={styles.input}
				id="static-option"
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</div>
	);
};

export default StaticOptions;
