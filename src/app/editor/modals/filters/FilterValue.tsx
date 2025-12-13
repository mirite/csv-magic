import type { ChangeEvent, FunctionComponent } from "react";

interface FilterValueProps {
	checked: boolean;
	count: number;
	onChange: (value: string, state: boolean) => void;
	value: string;
}

const FilterValue: FunctionComponent<FilterValueProps> = (props) => {
	const { checked, count, onChange: onToggle, value } = props;

	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked: newValue } = e.currentTarget;
		onToggle(value, newValue);
	};

	return (
		<li>
			<label>
				<input checked={checked} onChange={handleToggle} type="checkbox" />
				{value} ({count})
			</label>
		</li>
	);
};

export default FilterValue;
