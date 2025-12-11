import type { ReactElement } from "react";
import type { Cell } from "@/types.js";

import { CellComponent } from "./Cell.js";

const InactiveCell = (
	props: Readonly<Pick<Cell, "id" | "value">>,
): ReactElement => {
	const { id, value } = props;
	return (
		<CellComponent id={id}>
			<span data-id={id}>{value}</span>
		</CellComponent>
	);
};

export default InactiveCell;
