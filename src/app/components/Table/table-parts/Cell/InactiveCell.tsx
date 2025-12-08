import type { ReactElement } from "react";
import type { Cell } from "@/types.js";

import { CellComponent } from "./Cell.js";

const InactiveCell = (props: Cell): ReactElement => {
	const { id, value } = props;
	return (
		<CellComponent {...props}>
			<span data-id={id}>{value}</span>
		</CellComponent>
	);
};

export default InactiveCell;
