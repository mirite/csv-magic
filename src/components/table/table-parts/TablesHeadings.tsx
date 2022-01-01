import React, { FunctionComponent } from 'react';
import TableHeading from './TableHeading';
import { getColumnNames } from 'modules/access-helpers';
import { ISorts, ITable } from 'types';

interface TableHeadingsProps {
	table: ITable;
	onSetActiveModal: (arg0: string, column: string) => any;
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

	for (const fieldName of getColumnNames(table)) {
		cells.push(
			<TableHeading
				key={fieldName}
				fieldName={fieldName}
				activeSorts={activeSorts}
				onSetActiveModal={availableModals}
				onSort={() => onSort(fieldName)}
			/>
		);
	}
	return <tr>{cells}</tr>;
};

export default TableHeadings;
