// noinspection CheckTagEmptyBody

import React, { Component } from 'react';
import { IColumn, ITable } from 'types';
import styles from 'components/modals/BaseModal/BaseModal.module.css';

export interface BaseModalProps {

	/**
	 * The event handler for when the popover is closed.
	 */
	onClose: () => void;

	table: ITable;

	column?: IColumn;

	onApply: (t: ITable) => void;
}

export interface BaseModalState {
}

/**
 * A modal to show on top of the Table with different options to select.
 */
abstract class BaseModal<P extends BaseModalProps,
	S extends BaseModalState> extends Component<P, S> {
	/**
	 * A function to get the inner content of the popover.
	 */
	abstract getContent(): JSX.Element;

	render() {
		return (
			<div className='modal' style={{ display: 'block' }}>
				<div className={styles.container}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>{this.getTitle()}</h5>
							<button
								className='btn-close'
								onClick={this.props.onClose}
							></button>
						</div>
						<div className='modal-body'>{this.getContent()}</div>
						<div className='modal-footer'>
							<button
								className='btn btn-secondary'
								onClick={this.props.onClose}
							>
								Close
							</button>
							<button
								className='btn btn-primary'
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

	getApplyText(): string {
		return 'Apply';
	}

	isApplyEnabled(): boolean {
		return false;
	}

	protected handleApply(...params: unknown[]): void {
		this.props.onApply(this.toCall()(this.props.table, ...params));
	}

	protected abstract getTitle(): string;

	protected abstract toCall(): (t: ITable, ...params: unknown[]) => ITable;

}

export default BaseModal;
