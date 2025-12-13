import styles from "./Table.module.css";
import { updateCell, useFileStore } from "@/lib/index.js";
import type { ReactElement, MouseEvent } from "react";
import { useCallback } from "react";
import type { CellUpdateHandler, RowActionHandler, Table } from "@/types.js";

import { RowComponent } from "./table-parts/Row.js";
import TableHeadings from "./table-parts/TablesHeadings.js";

interface IProps {
	activeCell?: string;
	onRowAction: RowActionHandler;
	onSort: (columnID: number) => void;
	onTableBodyClick: (e: MouseEvent<HTMLTableSectionElement>) => void;
	onTableChange: (t: Table) => void;
}

const TableComponent = (props: IProps): ReactElement => {
	const { activeCell, onRowAction, onSort, onTableBodyClick, onTableChange } =
		props;
	const currentFile = useFileStore().currentFile()!;
	const { activeSorts, table: data } = currentFile;

	const handleCellChange = useCallback<CellUpdateHandler>(
		(changedCell, newValue) => {
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
							key={row.id}
							onAction={onRowAction}
							onCellChange={handleCellChange}
							row={row}
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
