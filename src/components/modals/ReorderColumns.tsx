import React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import { getColumns } from 'modules/access-helpers';
import ColumnPosition from './sub-controls/ColumnPosition';
import { IColumnPosition, ITable } from 'types';
import styles from 'styles/modals/ReorderColumnsModal.module.css';

interface IProps extends BaseModalProps {
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (reorderedColumns: Array<IColumnPosition>) => any;
}

interface IState {
	columns: Array<IColumnPosition>;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class ReorderColumnsModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const { table } = props;
		const columns = getColumns(table);
		this.state = {
			columns,
		};
	}
	getContent(): JSX.Element {
		const { columns } = this.state;
		return (
			<ol className={styles.list}>
				{columns.map((pair) => (
					<ColumnPosition
						key={pair.columnName}
						value={pair}
						onMove={(distance: number) =>
							this.handleChange(pair, distance)
						}
					/>
				))}
			</ol>
		);
	}
	handleChange(pair: IColumnPosition, distance: number) {
		throw new Error('Method not implemented.');
	}

	handleApply(): void {
		const { columns } = this.state;
		this.props.onApply(columns);
		this.props.onClose();
	}

	isApplyEnabled() {
		return true;
	}

	getApplyText() {
		return 'Reorder Columns';
	}
}
