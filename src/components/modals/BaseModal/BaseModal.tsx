// noinspection CheckTagEmptyBody

import React, { Component } from 'react';
import { IColumn, ITable } from 'types';
import styles from './BaseModal.module.css';

export interface BaseModalProps {
	/**
	 * The event handler for when the popover is closed.
	 */
	onClose: () => void;

	/**
	 * The table that the modal is operating on.
	 */
	table: ITable;

	/**
	 * The column (if applicable) that the modal is operating on.
	 */
	column?: IColumn;

	/**
	 * The function to call to alert the parent with the newly modified table.
	 *
	 * @param  t
	 */
	onApply: (t: ITable) => void;
}

export interface BaseModalState {}

/**
 * A modal to show on top of the Table with different options to select.
 */
abstract class BaseModal<
	P extends BaseModalProps,
	S extends BaseModalState
> extends Component<P, S> {
	render() {
		return (
			<div className="modal" style={{ display: 'block' }}>
				<div className={styles.container}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{this.getTitle()}</h5>
							<button
								className="btn-close"
								onClick={this.props.onClose}
							></button>
						</div>
						<div className="modal-body">{this.getContent()}</div>
						<div className="modal-footer">
							<button
								className="btn btn-secondary"
								onClick={this.props.onClose}
							>
								Close
							</button>
							<button
								className="btn btn-primary"
								onClick={() => this.handleApply()}
								disabled={!this.isApplyEnabled()}
							>
								{this.getApplyText()}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * The text label of the apply button;
	 */
	protected getApplyText(): string {
		return 'Apply';
	}

	/**
	 * Whether the apply button is currently enabled.
	 */
	protected isApplyEnabled(): boolean {
		return false;
	}

	/**
	 * A function to get the inner content of the popover.
	 */
	protected abstract getContent(): JSX.Element;

	/**
	 * A function that returns the title to display at the top of the popover.
	 */
	protected abstract getTitle(): string;

	/**
	 * Returns the function that is needed to be called that will process the table data before it is sent back to the parent.
	 */
	protected abstract toCall(): (t: ITable, ...params: unknown[]) => ITable;

	/**
	 * Applies the processing to the table with the parameters provided and sends that to the parent.
	 *
	 * @param  params The parameters required for processing.
	 */
	protected handleApply(...params: unknown[]): void {
		this.props.onApply(this.toCall()(this.props.table, ...params));
	}
}

export default BaseModal;
