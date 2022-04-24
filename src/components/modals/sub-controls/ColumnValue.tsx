import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { IColumn } from 'types';

interface ColumnValueProps {
	value: IColumn;
	onChange: (value: IColumn, state: boolean) => void;
}

const ColumnValue: FunctionComponent<ColumnValueProps> = (props) => {
	const { value, onChange: onToggle } = props;
	const [status, setStatus] = useState(false);
	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.currentTarget;
		setStatus(checked);
		onToggle(value, checked);
	};

	return (
		<li>
			<label>
				<input
					type="checkbox"
					checked={status}
					onChange={handleToggle}
				/>
				{value.label}
			</label>
		</li>
	);
};

export default ColumnValue;
