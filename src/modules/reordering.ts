import { ICell, IColumn, IRow, ITable } from 'types';

/**
 * Rearranges the columns in a table.
 *
 * @param  table          The table to reorder the columns in.
 * @param  newColumnOrder An array of the ids of the columns in their new order.
 */
export function reorderColumns(
	table: ITable,
	newColumnOrder: Array<string>
): ITable {
	const reorderedTable: ITable = {
		columns: [],
		contents: [],
	};

	reorderedTable.columns = createNewColumnField(
		table.columns,
		newColumnOrder
	);

	reorderedTable.contents = createNewRows(table.contents, newColumnOrder);
	return reorderedTable;
}

function createNewColumnField(
	columns: IColumn[],
	newColumnOrder: string[]
): IColumn[] {
	const newColumns: IColumn[] = [];
	let position = 0;
	for (const id of newColumnOrder) {
		const existingColumn: IColumn | undefined = columns.find(
			(c) => c.id === id
		);
		if (!existingColumn) throw new Error('Column ID not found in table');
		const { label } = existingColumn;
		newColumns.push({ position, id, label });
		position++;
	}
	return newColumns;
}

function createNewRows(rows: IRow[], newColumnOrder: string[]): IRow[] {
	return rows.map((row) => createNewRow(row, newColumnOrder));
}

function createNewRow(row: IRow, newColumnOrder: string[]): IRow {
	const newRow: IRow = {
		id: row.id,
		originalIndex: row.originalIndex,
		contents: [],
	};

	for (const columnID of newColumnOrder) {
		const existingCell: ICell | undefined = row.contents.find(
			(c) => c.columnID === columnID
		);
		if (!existingCell) throw new Error('Column ID not found in row');
		const { id, value } = existingCell;
		newRow.contents.push({ columnID, id, value });
	}
	return newRow;
}
