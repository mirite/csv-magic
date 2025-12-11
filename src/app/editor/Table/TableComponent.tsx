import styles from "./Table.module.css";
import { updateCell, useFileStore } from "@/lib/index.js";
import type { ReactElement, MouseEvent } from "react";
import { useCallback } from "react";
import type { Cell, Row, RowAction, Table } from "@/types.js";

import { RowComponent } from "./table-parts/Row/Row.js";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings.js";

interface IProps {
	activeCell?: string;
	onRowAction: (action: RowAction, row: Row) => void;
	onSort: (columnID: number) => void;
	onTableBodyClick: (e: MouseEvent<HTMLTableSectionElement>) => void;
	onTableChange: (t: Table) => void;
}

const TableComponent = (props: IProps): ReactElement => {
	const { activeCell, onRowAction, onSort, onTableBodyClick, onTableChange } =
		props;
	const currentFile = useFileStore().currentFile()!;
	const { activeSorts, table: data } = currentFile;

	const handleCellChange = useCallback(
		(changedCell: Cell, newValue: string) => {
			const newCell = { ...changedCell };
			newCell.value = newValue;
			const newData = updateCell(data, newCell);
			onTableChange(newData);
		},
		[onTableChange, data],
	);

	return (
		<div className={styles.container}>
			<table>
				<TableHeadings
					activeSorts={activeSorts}
					onSort={onSort}
					table={data}
					TablePart="thead"
				/>
				<tbody onClick={onTableBodyClick}>
					{data.contents.map((row) => (
						<RowComponent
							activeCell={activeCell}
							contents={row.contents}
							key={row.id}
							onAction={(action) => onRowAction(action, row)}
							onCellChange={handleCellChange}
							originalIndex={row.originalIndex}
						/>
					))}
				</tbody>
				<TableHeadings
					activeSorts={activeSorts}
					onSort={onSort}
					table={data}
					TablePart="tfoot"
				/>
			</table>
		</div>
	);
};

export default TableComponent;
