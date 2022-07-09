import React from 'react';
import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal';
import { getColumns } from 'modules/access-helpers';
import ColumnPosition from './ColumnPosition/ColumnPosition';
import { IColumn, ITable } from 'types';
import styles from './ReorderColumnsModal.module.css';
import { reorderColumns } from '../../../modules/reordering';

interface IState {
	columns: Array<IColumn>;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class ReorderColumnsModal extends BaseModal<
	BaseModalProps,
	IState
> {
	constructor(props: BaseModalProps) {
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
						toStart={-1 * index}
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
		const ids = columns.map((column) => column.id);
		super.handleApply(ids);
		this.props.onClose();
	}

	isApplyEnabled() {
		return true;
	}

	getApplyText() {
		return 'Reorder Columns';
	}

	getTitle(): string {
		return 'Reorder Columns';
	}

	toCall(): (t: ITable, ...params: any[]) => ITable {
		return reorderColumns;
	}
}
