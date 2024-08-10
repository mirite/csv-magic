import type { ReactElement } from "react";
import React from "react";
import type { Cell } from "types";
import { Row } from "types";

import type { RowAction } from "../../../Editor/Editor";
import ActiveCell from "../Cell/ActiveCell/ActiveCell";
import InactiveCell from "../Cell/InactiveCell";
import RowHeading from "../TableHeadings/TableHeading/RowHeading/RowHeading";

interface IProps extends Row {
	/** Handler for when the data in a cell is changed. */
	onCellChange: (cell: Cell, newValue: string) => void;

	/** The ID of the active cell within the Table (if there is one) */
	activeCell?: string;

	onAction: (action: RowAction) => void;
}

/**
 * Displays a row of cells within a Table.
 *
 * @param props
 */
function Row(props: IProps): ReactElement {
	const { contents: cells, activeCell, onCellChange, onAction } = props;
	return (
		<tr>
			<RowHeading onAction={(action) => onAction(action)} />
			{cells.map((cell) =>
				activeCell === cell.id ? (
					<ActiveCell
						key={cell.id}
						onChange={(newValue) => onCellChange(cell, newValue)}
						{...cell}
					/>
				) : (
					<InactiveCell key={cell.id} {...cell} />
				),
			)}
		</tr>
	);
}

export default Row;
