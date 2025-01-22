import type { ReactElement } from "react";
import React from "react";

import type { Sorts, Table } from "types";

import TableHeading from "./TableHeading/TableHeading";

import IntrinsicElements = React.JSX.IntrinsicElements;

interface TableHeadingsProps {
	TablePart: keyof IntrinsicElements;
	table: Table;
	onSort: (columnID: number) => void;
	activeSorts: Sorts;
}

const TableHeadings = (props: TableHeadingsProps): ReactElement => {
	const { activeSorts, table, onSort, TablePart } = props;

	return (
		<TablePart>
			<tr>
				<th />
				{table.columns.map((column) => (
					<TableHeading
						key={column.id}
						column={column}
						activeSorts={activeSorts}
						onSort={() => onSort(column.id)}
					/>
				))}
			</tr>
		</TablePart>
	);
};

export default TableHeadings;
