import * as styles from "./Table.module.css";
import { updateCell, useFileStore } from "@/lib/index.js";
import type { ReactElement } from "react";
import { useCallback } from "react";
import type { Cell, Row, Table } from "@/types.js";

import type { RowAction } from "../Editor/Editor.js";

import { RowComponent } from "./table-parts/Row/Row.js";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings.js";

interface IProps {
	activeCell?: string;
	onRowAction: (action: RowAction, row: Row) => void;
	onSort: (columnID: number) => void;
	onTableBodyClick: (e: React.MouseEvent<HTMLTableSectionElement>) => void;
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
					onSort={(columnID) => onSort(columnID)}
					table={data}
					TablePart="thead"
				/>
				<tbody onClick={onTableBodyClick}>
					{data.contents.map((row) => (
						<RowComponent
							key={row.id}
							{...row}
							activeCell={activeCell}
							onAction={(action) => onRowAction(action, row)}
							onCellChange={(e, newValue) => handleCellChange(e, newValue)}
						/>
					))}
				</tbody>
				<TableHeadings
					activeSorts={activeSorts}
					onSort={(columnID) => onSort(columnID)}
					table={data}
					TablePart="tfoot"
				/>
			</table>
		</div>
	);
};

export default TableComponent;
