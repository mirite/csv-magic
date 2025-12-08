import type { Cell, Column, Row, Table } from "@/types.js";

/**
 * Rearranges the columns in a Table.
 *
 * @param table The Table to reorder the columns in.
 * @param newColumnOrder An array of the ids of the columns in their new order.
 * @returns A new Table with the columns reordered.
 */
export function reorderColumns(
	table: Table,
	newColumnOrder: Array<number>,
): Table {
	const reorderedTable: Table = {
		columns: [],
		contents: [],
	};

	reorderedTable.columns = createNewColumnField(table.columns, newColumnOrder);

	reorderedTable.contents = createNewRows(table.contents, newColumnOrder);
	return reorderedTable;
}

/**
 * Rearranges the columns in a Table.
 *
 * @param columns The columns to reorder.
 * @param newColumnOrder An array of the ids of the columns in their new order.
 * @returns A new array of columns with the columns reordered.
 * @throws {Error} If a column ID is not found in the Table.
 */
function createNewColumnField(
	columns: Column[],
	newColumnOrder: number[],
): Column[] {
	const newColumns: Column[] = [];
	let position = 0;
	for (const id of newColumnOrder) {
		const existingColumn: Column | undefined = columns.find((c) => c.id === id);
		if (!existingColumn) {
			throw new Error("Column ID not found in Table");
		}
		const { label } = existingColumn;
		newColumns.push({ id, label, position });
		position++;
	}
	return newColumns;
}

/**
 * Rearranges the columns in a row.
 *
 * @param row The row to reorder.
 * @param newColumnOrder An array of the ids of the columns in their new order.
 * @returns A new row with the columns reordered.
 * @throws {Error} If a column ID is not found in the row.
 */
function createNewRow(row: Row, newColumnOrder: number[]): Row {
	const newRow: Row = {
		contents: [],
		id: row.id,
		originalIndex: row.originalIndex,
	};

	for (const columnID of newColumnOrder) {
		const existingCell: Cell | undefined = row.contents.find(
			(c) => c.columnID === columnID,
		);
		if (!existingCell) {
			throw new Error("Column ID not found in row");
		}
		const { id, value } = existingCell;
		newRow.contents.push({ columnID, id, value });
	}
	return newRow;
}

/**
 * Rearranges the columns in the rows of a Table.
 *
 * @param rows The rows to reorder.
 * @param newColumnOrder An array of the ids of the columns in their new order.
 * @returns A new array of rows with the columns reordered.
 */
function createNewRows(rows: Row[], newColumnOrder: number[]): Row[] {
	return rows.map((row) => createNewRow(row, newColumnOrder));
}
