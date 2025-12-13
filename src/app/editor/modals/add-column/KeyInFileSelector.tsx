import type { FunctionComponent } from "react";
import { useId } from "react";
import type { Table } from "@/types.js";

interface KeyInFileSelectorProps {
	label: string;
	onChange: (value: number) => unknown;
	table: Table;
	value: number;
}

const KeyInFileSelector: FunctionComponent<KeyInFileSelectorProps> = (
	props,
) => {
	const { label, onChange, table, value } = props;
	const columns = table.columns;
	const id = useId();

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
					<option key={key.id} selected={value === key.id} value={key.id}>
						{key.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default KeyInFileSelector;
