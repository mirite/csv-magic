import React, { FormEvent, FunctionComponent, useState } from 'react';
import { ITable } from '../../types';
import CSVSaver from '../../modules/csv-saver';

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
		<form onSubmit={(e) => saveTable(e)}>
			<input
				type="text"
				placeholder="File Name"
				value={fileName}
				onChange={(e) => setFileName(e.target.value)}
			/>
			<button type="submit">Save As</button>
		</form>
	);
};

export default SaveAsField;
