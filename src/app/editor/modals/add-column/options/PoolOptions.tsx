import type { ReactElement } from "react";
import { useId } from "react";

import styles from "../AddColumnOptions.module.css";
import type { AddColumnComponentProps } from "../types.js";

const PoolOptions = (
	props: AddColumnComponentProps<string[]>,
): ReactElement => {
	const { onChange, value } = props;
	const id = useId();
	const splitValues = (values: string) => {
		const newList = values.split(",").map((poolValue) => poolValue.trim());
		onChange(newList);
	};

	return (
		<div>
			<div>
				<label className={styles.label} htmlFor={id}>
					Pool Values (separated by commas):
				</label>
				<input
					className={styles.input}
					id={id}
					onChange={(e) => splitValues(e.target.value)}
					type="text"
				/>
			</div>
			<div>
				<h4>Values in Pool:</h4>
				<ul>
					{value.map((poolValue) => (
						<li key={poolValue}>{poolValue}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PoolOptions;
