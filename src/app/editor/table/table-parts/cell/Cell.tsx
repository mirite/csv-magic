import type { ReactElement } from "react";
import type { Cell, CellUpdateHandler } from "@/types.js";

import styles from "./Cell.module.css";
import ActiveCell from "./ActiveCell.js";
import InactiveCell from "./InactiveCell.js";

interface IProps {
	cell: Cell;
	/** The ID of the active cell within the Table (if there is one) */
	isActive: boolean;
	/** Handler for when the data in a cell is changed. */
	onCellChange: CellUpdateHandler;
}

/**
 * A single cell within a Table.
 *
 * @param props The properties of the cell.
 * @returns The cell component.
 */
export function CellComponent(props: Readonly<IProps>): ReactElement {
	const { cell, isActive, onCellChange } = props;

	return (
		<td className={styles.container} data-id={cell.id}>
			{isActive ? (
				<ActiveCell cell={cell} onChange={onCellChange} />
			) : (
				<InactiveCell cell={cell} />
			)}
		</td>
	);
}
