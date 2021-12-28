import React, { FunctionComponent } from 'react';
import { getColumnNames } from '../../../modules/access-helpers';
import { IRow, ITable } from '../../../types';
import TableHeading from './TableHeading';

interface TableHeadingsProps {
	table: ITable;
	onShowFilter: Function;
	onSort: Function;
	activeSorts: Array<[string, boolean]>;
}

const TableHeadings: FunctionComponent<TableHeadingsProps> = (props) => {
	const cells = [];
	const { activeSorts, table, onShowFilter, onSort } = props;
	for (const fieldName of getColumnNames(table)) {
		cells.push(
			<TableHeading
				key={fieldName}
				fieldName={fieldName}
				activeSorts={activeSorts}
				onShowFilter={() => onShowFilter(fieldName)}
				onSort={() => onSort(fieldName)}
			/>
		);
	}
	return <tr>{cells}</tr>;
};

export default TableHeadings;
