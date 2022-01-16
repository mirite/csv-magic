import React, { FunctionComponent } from 'react';
import TableHeading from './TableHeading';
import { getColumns } from 'modules/access-helpers';
import { IColumn, ISorts, ITable } from 'types';

interface TableHeadingsProps {
	table: ITable;
	onSetActiveModal: (arg0: string, column: IColumn) => any;
	onSort: Function;
	activeSorts: ISorts;
}

const TableHeadings: FunctionComponent<TableHeadingsProps> = (props) => {
	const cells = [];
	const {
		activeSorts,
		table,
		onSort,
		onSetActiveModal: availableModals,
	} = props;

	for (const column of getColumns(table)) {
		cells.push(
			<TableHeading
				key={column.id}
				column={column}
				activeSorts={activeSorts}
				onSetActiveModal={availableModals}
				onSort={() => onSort(column.id)}
			/>
		);
	}
	return <tr>{cells}</tr>;
};

export default TableHeadings;
