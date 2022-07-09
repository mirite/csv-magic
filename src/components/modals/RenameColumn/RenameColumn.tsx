import React from 'react';
import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal';
import { IColumn, ITable } from 'types';
import styles from 'components/modals/RenameColumn/RenameColumnModal.module.css';

interface IProps extends BaseModalProps {
	column: IColumn;
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (column: IColumn, newName: string) => void;
}

interface IState {
	newName: string;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class RenameColumnModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			newName: '',
		};
	}
	getContent(): JSX.Element {
		const { column } = this.props;
		return (
			<div>
				<p>Renaming &quot;{column.label}&quot;</p>
				<div className={styles.container}>
					<div className={styles.group}>
						<label htmlFor="find-input">New Name:</label>
						<input
							id="find-input"
							className={styles.input}
							type="text"
							value={this.state.newName}
							onChange={(e) => this.handleNewNameChange(e)}
						/>
					</div>
				</div>
			</div>
		);
	}

	handleNewNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { value } = e.target;
		this.setState({ newName: value });
	}

	handleApply(): void {
		const { newName } = this.state;
		const { column } = this.props;
		this.props.onApply(column, newName.trim());
		this.props.onClose();
	}

	getApplyText() {
		return 'Rename';
	}

	isApplyEnabled() {
		const { newName } = this.state;
		return newName.trim() !== '';
	}
}
