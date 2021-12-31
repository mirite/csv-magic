import { getColumnNames } from 'modules/access-helpers';
import React, { FunctionComponent } from 'react';
import { ITable } from 'types';

interface KeyInFileSelectorProps {
	table: ITable;
	label: string;
}

const KeyInFileSelector: FunctionComponent<KeyInFileSelectorProps> = (
	props
) => {
	if (!props.table) return <p>No Keys Found In File</p>;
	const keys = getColumnNames(props.table);
	return (
		<div>
			<label htmlFor="select-key-in-file">{props.label}</label>
			<select id="select-key-in-file">
				{keys.map((key) => (
					<option key={key} value={key}>
						{key}
					</option>
				))}
			</select>
		</div>
	);
};

export default KeyInFileSelector;
