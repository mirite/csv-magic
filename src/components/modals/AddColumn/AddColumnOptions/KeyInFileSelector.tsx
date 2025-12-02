import type { FunctionComponent } from "react";
import React, { useId } from "react";
import type { Table } from "types";

interface KeyInFileSelectorProps {
	label: string;
	onChange: (value: number) => void;
	table: Table;
}

const KeyInFileSelector: FunctionComponent<KeyInFileSelectorProps> = (
	props,
) => {
	const { label, onChange, table } = props;
	const columns = table.columns;
	const id = useId();
	if (!props.table) {
		return <p>No Keys Found In File</p>;
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				onChange={(event) =>
					onChange(Number.parseInt(event.currentTarget.value))
				}
			>
				<option value="">Please select a key</option>
				{columns.map((key) => (
					<option key={key.id} value={key.id}>
						{key.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default KeyInFileSelector;
