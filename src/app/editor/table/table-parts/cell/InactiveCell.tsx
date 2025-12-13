import type { ReactElement } from "react";
import type { Cell } from "@/types.js";

const InactiveCell = (props: {
	cell: Readonly<Pick<Cell, "id" | "value">>;
}): ReactElement => {
	const { id, value } = props.cell;
	return <span data-id={id}>{value}</span>;
};

export default InactiveCell;
