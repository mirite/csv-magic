import type { ReactElement } from "react";
import type { Cell, Row, RowAction } from "@/types.js";

import ActiveCell from "../Cell/ActiveCell/ActiveCell.js";
import InactiveCell from "../Cell/InactiveCell.js";
import RowHeading from "../TableHeadings/TableHeading/RowHeading/RowHeading.js";

interface IProps extends Row {
	/** The ID of the active cell within the Table (if there is one) */
	activeCell?: string;

	onAction: (action: RowAction) => unknown;

	/** Handler for when the data in a cell is changed. */
	onCellChange: (cell: Cell, newValue: string) => unknown;
}

/**
 * Displays a row of cells within a Table.
 *
 * @param props The properties of the row.
 * @returns The row component.
 */
export function RowComponent(props: IProps): ReactElement {
	const { activeCell, contents: cells, onAction, onCellChange } = props;
	return (
		<tr>
			<RowHeading onAction={onAction} />
			{cells.map((cell) =>
				activeCell === cell.id ? (
					<ActiveCell
						columnID={cell.columnID}
						id={cell.id}
						key={cell.id}
						onChange={(newValue) => onCellChange(cell, newValue)}
						value={cell.value}
					/>
				) : (
					<InactiveCell id={cell.id} key={cell.id} value={cell.value} />
				),
			)}
		</tr>
	);
}
