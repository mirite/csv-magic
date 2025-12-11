import styles from "../Cell.module.css";
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";
import type { Cell } from "@/types.js";

import { CellComponent } from "../Cell.js";

interface Props extends Cell {
	onChange: (newValue: string) => unknown;
}
/**
 * A Table cell that is currently selected. This changes the text label into an
 * input for editing.
 *
 * @param props The properties of the cell.
 * @returns The active cell component.
 */
const ActiveCell = (props: Props): ReactElement => {
	const { onChange, value } = props;
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [timeoutId, setTimeoutId] = useState<null | number>(null);

	const rowCount = value.split("\n").length;

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (timeoutId) window.clearTimeout(timeoutId);
		const newValue = e.currentTarget.value;
		setDebouncedValue(newValue);
		setTimeoutId(window.setTimeout(() => onChange(newValue), 300));
	};

	return (
		<CellComponent id={props.id}>
			<textarea
				className={styles.input}
				onChange={handleChange}
				rows={rowCount}
				value={debouncedValue}
			/>
		</CellComponent>
	);
};

export default ActiveCell;
