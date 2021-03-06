import React from 'react';
import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal';
import { EGeneratorTypes, IMappedColumn, ITable } from 'types';
import styles from './AddColumn.module.css';
import ColumnTypeRadio from './AddColumnOptions/ColumnType';
import LookupOptions from './AddColumnOptions/options/LookupOptions';
import PoolOptions from './AddColumnOptions/options/PoolOptions';
import StaticOptions from './AddColumnOptions/options/StaticOptions';
import DuplicateOptions from './AddColumnOptions/options/DuplicateOptions';
import { addColumn } from '../../../modules/column-generation/column-generator';

interface IState {
	newName: string;
	newType: EGeneratorTypes;
	params: undefined | string | string[] | IMappedColumn;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class AddColumnModal extends BaseModal<BaseModalProps, IState> {
	constructor(props: BaseModalProps) {
		super(props);
		this.state = {
			newName: '',
			newType: EGeneratorTypes.blank,
			params: undefined,
		};
	}

	getContent(): JSX.Element {
		return (
			<div>
				<div>
					<div className={styles.group}>
						<label htmlFor="name-input">
							<h3>Column Name:</h3>
						</label>
						<input
							id="name-input"
							className={styles.input}
							type="text"
							value={this.state.newName}
							onChange={(e) => this.handleNewNameChange(e)}
						/>
					</div>
					<div className={styles.group}>
						<h3>Column Type:</h3>
						<ColumnTypeRadio
							label="Blank"
							description="An empty column, nothing magical here."
							type={EGeneratorTypes.blank}
							onChange={(e) => this.handleTypeChange(e)}
							default={true}
						/>
						<ColumnTypeRadio
							label="Static"
							description="A column filled with a set value, It could be blank if you are really opposed to using the blank option."
							type={EGeneratorTypes.statically}
							onChange={(e) => this.handleTypeChange(e)}
						/>
						<ColumnTypeRadio
							label="Lookup"
							description="A column filled with data from matches in another open table. Basically a portal."
							type={EGeneratorTypes.lookup}
							onChange={(e) => this.handleTypeChange(e)}
						/>
						<ColumnTypeRadio
							label="Pool"
							description="A column with values randomly (but evenly) assigned from a pool of available values. (We can pretend it's a cauldron if you want)."
							type={EGeneratorTypes.pool}
							onChange={(e) => this.handleTypeChange(e)}
						/>
						<ColumnTypeRadio
							label="Duplicate"
							description="A column that is an exact clone of a column in this table."
							type={EGeneratorTypes.duplicate}
							onChange={(e) => this.handleTypeChange(e)}
						/>
					</div>
					<div className={styles.group}>
						<h3>Options:</h3>
						{this.additionalOptions()}
					</div>
				</div>
			</div>
		);
	}

	additionalOptions(): React.ReactNode {
		if (this.state.newType === EGeneratorTypes.blank) {
			return <span>There are no options for blank.</span>;
		}
		if (this.state.newType === EGeneratorTypes.statically) {
			return (
				<StaticOptions
					onChange={(value: string) => this.handleParamsChange(value)}
				/>
			);
		}
		if (this.state.newType === EGeneratorTypes.lookup) {
			return (
				<LookupOptions
					onChange={(value: IMappedColumn) =>
						this.handleParamsChange(value)
					}
				/>
			);
		}
		if (this.state.newType === EGeneratorTypes.pool) {
			return (
				<PoolOptions
					onChange={(values: string[]) =>
						this.handleParamsChange(values)
					}
				/>
			);
		}
		if (this.state.newType === EGeneratorTypes.duplicate) {
			return (
				<DuplicateOptions
					onChange={(value: string) => this.handleParamsChange(value)}
				/>
			);
		}
	}

	handleParamsChange(value: string | string[] | IMappedColumn) {
		this.setState({ params: value });
	}

	handleTypeChange(e: EGeneratorTypes): void {
		this.setState({ newType: e, params: undefined });
	}

	/**
	 * Keep the column name input in-sync with the state.
	 *
	 * @param  e The column name input.
	 */
	handleNewNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { value } = e.target;
		this.setState({ newName: value });
	}

	/**
	 * Handles the modals onApply event.
	 */
	handleApply(): void {
		const { newName, params, newType } = this.state;
		if (newType === EGeneratorTypes.blank) {
			super.handleApply(newName, newType);
		} else {
			super.handleApply(newName, newType, params);
		}
		this.props.onClose();
	}

	isApplyEnabled() {
		const { newName, params, newType } = this.state;
		return !!((params || newType === EGeneratorTypes.blank) && newName);
	}

	getTitle(): string {
		return 'Add Column';
	}

	toCall(): (t: ITable, ...params: any[]) => ITable {
		return addColumn;
	}
}
