import styles from "components/Table/Table.module.css";
import { updateCell } from "modules/editing";
import type { ReactElement } from "react";
import React, { useCallback } from "react";
import type { Cell, Row, Table } from "types";

import { useFileStore } from "../../modules/useFileStore";
import type { RowAction } from "../Editor/Editor";

import RowComponent from "./table-parts/Row/Row";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings";

interface IProps {
	onSort: (columnID: number) => void;
	onTableChange: (t: Table) => void;
	onTableBodyClick: (e: React.MouseEvent<HTMLTableSectionElement>) => void;
	onRowAction: (action: RowAction, row: Row) => void;
	activeCell?: string;
}

const TableComponent = (props: IProps): ReactElement => {
	const { onSort, onRowAction, onTableChange, activeCell, onTableBodyClick } =
		props;
	const currentFile = useFileStore().currentFile()!;
	const { table: data, activeSorts } = currentFile;

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
					TablePart="thead"
					table={data}
					activeSorts={activeSorts}
					onSort={(columnID) => onSort(columnID)}
				/>
				<tbody onClick={onTableBodyClick}>
					{data.contents.map((row) => (
						<RowComponent
							key={row.id}
							{...row}
							activeCell={activeCell}
							onCellChange={(e, newValue) => handleCellChange(e, newValue)}
							onAction={(action) => onRowAction(action, row)}
						/>
					))}
				</tbody>
				<TableHeadings
					TablePart="tfoot"
					table={data}
					activeSorts={activeSorts}
					onSort={(columnID) => onSort(columnID)}
				/>
			</table>
		</div>
	);
};

export default TableComponent;
