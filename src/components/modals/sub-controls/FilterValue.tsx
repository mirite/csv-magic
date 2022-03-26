import React, { ChangeEvent, FunctionComponent, useState } from 'react';

interface FilterValueProps {
	value: string;
	count: number;
	onChange: ( value: string, state: boolean ) => void;
}

const FilterValue: FunctionComponent<FilterValueProps> = ( props ) => {
	const { value, count, onChange: onToggle } = props;
	const [ status, setStatus ] = useState( false );
	const handleToggle = ( e: ChangeEvent<HTMLInputElement> ) => {
		const { checked } = e.currentTarget;
		setStatus( checked );
		onToggle( value, checked );
	};

	return (
		<li>
			<label>
				<input
					type="checkbox"
					checked={ status }
					onChange={ handleToggle }
				/>
				{ value } ({ count })
			</label>
		</li>
	);
};

export default FilterValue;
