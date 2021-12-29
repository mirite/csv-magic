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
				<label className={styles.group}>
					<input
						type="text"
						id="fileName"
						className="form-control"
						placeholder="File Name"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
					/>
				</label>
				<button type="submit" className={styles.button}>
					Save As
				</button>
			</form>
		</div>
	);
};

export default SaveAsField;
