import type { ReactElement } from "react";
import type { Sorts, Table } from "@/types.js";

import TableHeading from "./TableHeading/TableHeading.js";

interface TableHeadingsProps {
	activeSorts: Sorts;
	onSort: (columnID: number) => void;
	table: Table;
	TablePart: "tfoot" | "thead";
}

const TableHeadings = (props: Readonly<TableHeadingsProps>): ReactElement => {
	const { activeSorts, onSort, table, TablePart } = props;

	return (
		<TablePart>
			<tr>
				<th />
				{table.columns.map((column) => (
					<TableHeading
						activeSorts={activeSorts}
						column={column}
						key={column.id}
						onSort={() => onSort(column.id)}
					/>
				))}
			</tr>
		</TablePart>
	);
};

export default TableHeadings;
