import type { ReactElement } from "react";
import React from "react";
import type { Sorts, Table } from "types";

import TableHeading from "./TableHeading/TableHeading";

import IntrinsicElements = React.JSX.IntrinsicElements;

interface TableHeadingsProps {
	activeSorts: Sorts;
	onSort: (columnID: number) => void;
	table: Table;
	TablePart: keyof IntrinsicElements;
}

const TableHeadings = (props: TableHeadingsProps): ReactElement => {
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
