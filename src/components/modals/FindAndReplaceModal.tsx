import React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import { ITable } from 'types';
import styles from 'styles/FindAndReplaceModal.module.css';

interface IProps extends BaseModalProps {
	column: string;
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (column: string, oldValue: string, newValue: string) => void;
}

interface IState {
	findValue: string;
	replaceValue: string;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class FindAndReplaceModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { findValue: '', replaceValue: '' };
	}
	getContent(): JSX.Element {
		const { column } = this.props;
		return (
			<div>
				<p>Searching in &quot;{column}&quot;</p>
				<div className={styles.container}>
					<label className={styles.group}>
						Find:
						<input
							type="text"
							value={this.state.findValue}
							onChange={(e) => this.handleFindChange(e)}
						/>
					</label>
					<label className={styles.group}>
						Replace:
						<input
							type="text"
							value={this.state.replaceValue}
							onChange={(e) => this.handleReplaceChange(e)}
						/>
					</label>
				</div>
				<div>
					<button className={styles.button}>Test</button>
				</div>
			</div>
		);
	}
	handleReplaceChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { value } = e.target;
		this.setState({ replaceValue: value });
	}
	handleFindChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { value } = e.target;
		this.setState({ findValue: value });
	}

	handleApply(): void {
		const { findValue, replaceValue } = this.state;
		const { column } = this.props;
		this.props.onApply(column, findValue, replaceValue);
		this.props.onClose();
	}
}
