import React, { FunctionComponent } from 'react';
import { IRow } from '../../../types';
import TableHeading from './TableHeading';

interface TableHeadingsProps {
	exampleRow: IRow;
	onShowFilter: Function;
	onSort: Function;
	activeSorts: Array<[string, boolean]>;
}

const TableHeadings: FunctionComponent<TableHeadingsProps> = (props) => {
	const cells = [];
	const { activeSorts, exampleRow, onShowFilter, onSort } = props;
	for (const cell of exampleRow.contents) {
		const { key } = cell;
		cells.push(
			<TableHeading
				key={key}
				exampleCell={cell}
				activeSorts={activeSorts}
				onShowFilter={() => onShowFilter(key)}
				onSort={() => onSort(key)}
			/>
		);
	}
	return <tr>{cells}</tr>;
};

export default TableHeadings;
