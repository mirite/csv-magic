import React, { FunctionComponent, useState } from 'react';
import styles from '../AddColumnOptions.module.css';

interface PoolOptionsProps {
	onChange: (e: string[]) => void;
}

const PoolOptions: FunctionComponent<PoolOptionsProps> = (props) => {
	const [valueList, setValueList] = useState<string[]>([]);
	const splitValues = (values: string) => {
		const newList = values.split(',').map((value: string) => value.trim());
		setValueList(newList);
		props.onChange(newList);
	};

	return (
		<div>
			<div>
				<label htmlFor="pool-values" className={styles.label}>
					Pool Values (separated by commas):
				</label>
				<input
					type="text"
					className={styles.input}
					id="static-option"
					onChange={(e) => splitValues(e.target.value)}
				/>
			</div>
			<div>
				<h4>Values in Pool:</h4>
				<ul>
					{valueList.map((value) => (
						<li key={value}>{value}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PoolOptions;
