import React, { FunctionComponent } from 'react';
import { ITable } from '../../types';
import CSVSaver from '../../modules/csv-saver';

interface SaveAsFieldProps {
	table: ITable;
}

const SaveAsField: FunctionComponent<SaveAsFieldProps> = (props) => {
	const saveTable = () => {
		CSVSaver(props.table);
	};
	return (
		<button type="button" onClick={() => saveTable()}>
			Save As
		</button>
	);
};

export default SaveAsField;
