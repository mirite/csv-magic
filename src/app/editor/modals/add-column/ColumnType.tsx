import type { FunctionComponent } from "react";
import { useId } from "react";

interface ColumnTypeRadioProps {
	checked: boolean;
	description: string;
	label: string;
	onChange: () => void;
}

const ColumnTypeRadio: FunctionComponent<ColumnTypeRadioProps> = (props) => {
	const id = useId();
	return (
		<div>
			<input
				defaultChecked={props.checked}
				id={id}
				name="column-type"
				onChange={props.onChange}
				type="radio"
			/>
			<label htmlFor={id}>
				<strong>{props.label}</strong>
			</label>
			<p>{props.description}</p>
		</div>
	);
};

export default ColumnTypeRadio;
