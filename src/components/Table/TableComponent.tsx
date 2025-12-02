import * as styles from "components/Table/Table.module.css";
import { updateCell } from "modules/editing";
import type { ReactElement } from "react";
import React, { useCallback } from "react";
import type { Cell, Row, Table } from "types";

import { useFileStore } from "../../modules/useFileStore";
import type { RowAction } from "../Editor/Editor";

import RowComponent from "./table-parts/Row/Row";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings";

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
