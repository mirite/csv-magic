import React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import { getColumns } from 'modules/access-helpers';
import ColumnPosition from './sub-controls/ColumnPosition';
import { IColumn, IColumnPosition, ITable } from 'types';
import styles from 'styles/modals/ReorderColumnsModal.module.css';

interface IProps extends BaseModalProps {
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (reorderedColumns: Array<IColumn>) => any;
}

interface IState {
	columns: Array<IColumn>;
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
			<div className={styles.list}>
				{columns.map((column, index) => (
					<ColumnPosition
						key={column.id}
						value={column}
						onMove={(distance: number) =>
							this.handleChange(index, distance)
						}
						toStart={index}
						toEnd={columns.length - 1 - index}
					/>
				))}
			</div>
		);
	}
	handleChange(initialIndex: number, distance: number) {
		const { columns } = this.state;
		const newIndex = initialIndex + distance;
		const newOrder = [...columns];
		const columnToMove = newOrder[initialIndex];
		newOrder.splice(initialIndex, 1);
		newOrder.splice(newIndex, 0, columnToMove);
		this.setState({ columns: newOrder });
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
