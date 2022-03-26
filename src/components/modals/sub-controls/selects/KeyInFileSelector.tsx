import { getColumns } from 'modules/access-helpers';
import React, { FunctionComponent } from 'react';
import { ITable } from 'types';

interface KeyInFileSelectorProps {
	table: ITable;
	label: string;
	onChange: ( event: string ) => void;
}

const KeyInFileSelector: FunctionComponent<KeyInFileSelectorProps> = (
	props,
) => {
	if ( ! props.table ) {
		return <p>No Keys Found In File</p>;
	}
	const columns = getColumns( props.table );
	return (
		<div>
			<label htmlFor="select-key-in-file">{ props.label }</label>
			<select
				id="select-key-in-file"
				onChange={ ( event ) => props.onChange( event.currentTarget.value ) }
			>
				<option value="">Please select a key</option>
				{ columns.map( ( key ) => (
					<option key={ key.id } value={ key.id }>
						{ key.label }
					</option>
				) ) }
			</select>
		</div>
	);
};

export default KeyInFileSelector;
