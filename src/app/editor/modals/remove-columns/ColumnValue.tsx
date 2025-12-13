import type { ChangeEvent, FunctionComponent } from "react";
import { useState } from "react";
import type { Column } from "@/types.js";

interface ColumnValueProps {
	onChange: (value: Column, state: boolean) => void;
	value: Column;
}

const ColumnValue: FunctionComponent<ColumnValueProps> = (props) => {
	const { onChange: onToggle, value } = props;
	const [status, setStatus] = useState(false);
	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.currentTarget;
		setStatus(checked);
		onToggle(value, checked);
	};

	return (
		<li>
			<label>
				<input checked={status} onChange={handleToggle} type="checkbox" />
				{value.label}
			</label>
		</li>
	);
};

export default ColumnValue;
