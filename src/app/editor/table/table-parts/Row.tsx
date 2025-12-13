import type { ReactElement } from "react";
import type { CellUpdateHandler, Row, RowActionHandler } from "@/types.js";

import RowHeading from "./RowHeading.js";
import { CellComponent } from "./cell/Cell.js";

interface IProps {
	activeCell?: string;
	onAction: RowActionHandler;
	onCellChange: CellUpdateHandler;
	row: Row;
}

/**
 * Displays a row of cells within a Table.
 *
 * @param props The properties of the row.
 * @returns The row component.
 */
export function RowComponent(props: IProps): ReactElement {
	const { activeCell, onAction, onCellChange, row } = props;
	return (
		<tr>
			<RowHeading onAction={onAction} row={row} />
			{row.contents.map((cell) => (
				<CellComponent
					cell={cell}
					isActive={activeCell === cell.id}
					key={cell.id}
					onCellChange={onCellChange}
				/>
			))}
		</tr>
	);
}
