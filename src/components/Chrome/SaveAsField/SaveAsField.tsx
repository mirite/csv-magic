import React, { FormEvent, FunctionComponent, useState } from 'react';
import { ITable } from 'types';
import CSVSaver, { supportedFileTypes } from 'modules/csv-saver';
import styles from 'components/Chrome/SaveAsField/SaveAsField.module.css';

interface SaveAsFieldProps {
	table: ITable;
}

const SaveAsField: FunctionComponent<SaveAsFieldProps> = (props) => {
	const [fileName, setFileName] = useState('');
	const [fileType, setFileType] = useState<supportedFileTypes>('csv');

	const saveTable = (e: FormEvent) => {
		e.preventDefault();
		CSVSaver(props.table, fileType, fileName);
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
				<select
					onChange={(e) =>
						setFileType(e.target.value as supportedFileTypes)
					}
					value={fileType}
					className={styles.input}
				>
					<option value="csv">.csv</option>
					<option value="json">.json</option>
					<option value="sql">.sql (Experimental)</option>
				</select>
				<button type="submit" className={styles.button}>
					Save
				</button>
			</form>
		</div>
	);
};

export default SaveAsField;
