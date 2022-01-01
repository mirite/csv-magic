import React, { FormEvent, FunctionComponent, useState } from 'react';
import { ITable } from 'types';
import CSVSaver from 'modules/csv-saver';
import styles from 'styles/chrome/SaveAsField.module.css';

interface SaveAsFieldProps {
	table: ITable;
}

const SaveAsField: FunctionComponent<SaveAsFieldProps> = (props) => {
	const [fileName, setFileName] = useState('');

	const saveTable = (e: FormEvent) => {
		e.preventDefault();
		CSVSaver(props.table, fileName);
	};

	return (
		<div>
			<form className={styles.container} onSubmit={(e) => saveTable(e)}>
				<input
					type="text"
					id="input-fileName"
					className={styles.input}
					placeholder="File Name"
					value={fileName}
					onChange={(e) => setFileName(e.target.value)}
				/>
				<button type="submit" className={styles.button}>
					Save
				</button>
			</form>
		</div>
	);
};

export default SaveAsField;
