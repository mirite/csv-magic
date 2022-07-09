import React from 'react';
import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal';
import { IColumn, ITable } from 'types';
import styles from './RemoveColumnsModal.module.css';
import { getColumns } from 'modules/access-helpers';
import ColumnValue from './ColumnValue/ColumnValue';

interface IProps extends BaseModalProps {
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (columns: IColumn[]) => void;
}

interface IState {
	columns: Array<[IColumn, boolean]>;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class RemoveColumnsModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const { table } = props;
		const columns = getColumns(table);
		this.state = {
			columns: columns.map((label) => [label, false]),
		};
	}
	getContent(): JSX.Element {
		const { columns } = this.state;
		return (
			<ul className={styles.list}>
				{columns.map((pair) => (
					<ColumnValue
						key={pair[0].id}
						value={pair[0]}
						onChange={(value: IColumn, status: boolean) =>
							this.handleChange(value, status)
						}
					/>
				))}
			</ul>
		);
	}

	handleChange(column: IColumn, status: boolean): void {
		const newColumns = [...this.state.columns];
		const oldRecord = newColumns.find((pair) => pair[0].id === column.id);
		if (oldRecord) {
			oldRecord[1] = status;
			this.setState({ columns: newColumns });
		}
	}

	getColumnsToDelete() {
		const { columns } = this.state;
		return columns.filter((pair) => pair[1]).map((pair) => pair[0]);
	}

	handleApply(): void {
		const columnsToDelete = this.getColumnsToDelete();
		this.props.onApply(columnsToDelete);
		this.props.onClose();
	}

	isApplyEnabled() {
		return this.getColumnsToDelete().length > 0;
	}

	getApplyText() {
		return 'Remove Selected Columns';
	}
}
