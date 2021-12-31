import React, { Component } from 'react';
import { ITable } from 'types';
import styles from 'styles/modals/BaseModal.module.css';

export interface BaseModalProps {
	/**
	 * The title of the popover.
	 */
	title: string;

	/**
	 * The event handler for when the popover is closed.
	 */
	onClose: () => void;

	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: Function;

	table: ITable;

	column?: string;
}

export interface BaseModalState {}

/**
 * A modal to show on top of the table with different options to select.
 */
abstract class BaseModal<
	P extends BaseModalProps,
	S extends BaseModalState
> extends Component<P, S> {
	/**
	 * A function to get the inner content of the popover.
	 */
	abstract getContent(): JSX.Element;
	render() {
		return (
			<div className="modal" style={{ display: 'block' }}>
				<div className={styles.container}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{this.props.title}</h5>
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

	getApplyText(): string {
		return 'Apply';
	}

	isApplyEnabled(): boolean {
		return false;
	}
	abstract handleApply(): void;
}

export default BaseModal;
