import React, { FunctionComponent } from 'react';
import { EGeneratorTypes } from 'types';

interface ColumnTypeRadioProps {
	label: string;
	description: string;
	type: EGeneratorTypes;
	onChange: (e: EGeneratorTypes) => void;
}

const ColumnTypeRadio: FunctionComponent<ColumnTypeRadioProps> = (props) => {
	const id = props.label + '-radio';
	return (
		<div>
			<input
				type="radio"
				id={id}
				name="column-type"
				onChange={() => props.onChange(props.type)}
			/>
			<label htmlFor={id}>
				<strong>{props.label}</strong>
			</label>
			<p>{props.description}</p>
		</div>
	);
};

export default ColumnTypeRadio;
