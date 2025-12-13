import type { ReactElement } from "react";
import { useId } from "react";

import styles from "../AddColumnOptions.module.css";

interface PoolOptionsProps {
	onChange: (e: string[]) => void;
	state: string[];
}

const PoolOptions = (props: PoolOptionsProps): ReactElement => {
	const { onChange, state } = props;
	const id = useId();
	const splitValues = (values: string) => {
		const newList = values.split(",").map((value) => value.trim());
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
					{state.map((value) => (
						<li key={value}>{value}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PoolOptions;
