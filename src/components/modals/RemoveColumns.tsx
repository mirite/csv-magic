import React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import { ITable } from 'types';
import styles from 'styles/modals/RemoveColumnsModal.module.css';
import { getColumnNames } from 'modules/access-helpers';
import ColumnValue from './sub-controls/ColumnValue';

interface IProps extends BaseModalProps {
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (columns: string[]) => void;
}

interface IState {
	columns: Array<[string, boolean]>;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class RemoveColumnsModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const { table } = props;
		const columns = getColumnNames(table);
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
						key={pair[0]}
						value={pair[0]}
						onChange={(value: string, status: boolean) =>
							this.handleChange(value, status)
						}
					/>
				))}
			</ul>
		);
	}

	handleChange(label: string, status: boolean): void {
		const newColumns = [...this.state.columns];
		const oldRecord = newColumns.find((pair) => pair[0] === label);
		if (oldRecord) {
			oldRecord[1] = status;
			this.setState({ columns: newColumns });
		}
	}

	handleApply(): void {
		const { columns } = this.state;
		const columnsToDelete = columns
			.filter((pair) => pair[1])
			.map((pair) => pair[0]);
		this.props.onApply(columnsToDelete);
		this.props.onClose();
	}

	getApplyText() {
		return 'Remove Selected Columns';
	}
}
