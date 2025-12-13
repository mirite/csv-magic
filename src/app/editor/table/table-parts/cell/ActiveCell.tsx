import styles from "./Cell.module.css";
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";
import type { Cell, CellUpdateHandler } from "@/types.js";

interface Props {
	cell: Cell;
	onChange: CellUpdateHandler;
}
/**
 * A Table cell that is currently selected. This changes the text label into an
 * input for editing.
 *
 * @param props The properties of the cell.
 * @returns The active cell component.
 */
const ActiveCell = (props: Props): ReactElement => {
	const { cell, onChange } = props;
	const { value } = cell;
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [timeoutId, setTimeoutId] = useState<null | number>(null);

	const rowCount = value.split("\n").length;

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (timeoutId) window.clearTimeout(timeoutId);
		const newValue = e.currentTarget.value;
		setDebouncedValue(newValue);
		setTimeoutId(window.setTimeout(() => onChange(cell, newValue), 300));
	};

	return (
		<textarea
			className={styles.input}
			onChange={handleChange}
			rows={rowCount}
			value={debouncedValue}
		/>
	);
};

export default ActiveCell;
