import React from 'react';
import BaseModal, { BaseModalProps } from './BaseModal';
import FilterValue from './sub-controls/FilterValue';
import { getUniqueValuesInColumn } from 'modules/access-helpers';
import { IColumn, IFilter, ITable } from 'types';
import styles from 'styles/modals/FiltersModal.module.css';

interface IProps extends BaseModalProps {
	column: IColumn;
	table: ITable;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (newFilters: IFilter) => void;
}

interface IState {
	filterList: IFilter;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class FiltersModal extends BaseModal<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const { column } = props;
		this.state = { filterList: { column, values: [] } };
	}
	getContent(): JSX.Element {
		const { table, column } = this.props;
		return (
			<>
				<ul className={styles.list}>
					{getUniqueValuesInColumn(table, column.id).map((pair) => (
						<FilterValue
							key={pair[0]}
							value={pair[0]}
							count={pair[1]}
							checked={this.state.filterList.values.includes(
								pair[0]
							)}
							onChange={(value: string, status: boolean) =>
								this.handleChange(value, status)
							}
						/>
					))}
				</ul>
				<button
					onClick={() => this.invertSelection()}
					className={styles.button}
				>
					Invert Selection
				</button>
			</>
		);
	}

	handleChange(valueToToggle: string, newStatus: boolean) {
		/**
		 * The filter list previously existing in the state.
		 */
		const oldFilterList = this.state.filterList.values;
		const { column } = this.props;

		/**
		 * The new filter list once our change is applied.
		 */
		const newFilterList: IFilter = { column, values: [] };

		//If the filter status was switched to off, we just need the filter list with that filter removed
		//(Even if it was never there to begin with)
		if (!newStatus) {
			newFilterList.values = oldFilterList.filter(
				(existingValue) => existingValue !== valueToToggle
			);
		} else {
			/**
			 * Any existing filters on value.
			 */
			const existingFilter = oldFilterList.find(
				(existingValue) => existingValue === valueToToggle
			);

			//If we are already filtering on this value no need to update the state.
			if (existingFilter) {
				return;
			}

			newFilterList.values = [...oldFilterList, valueToToggle];
		}

		this.setState({ filterList: newFilterList });
	}

	handleApply(): void {
		const { filterList } = this.state;
		this.props.onApply(filterList);
		this.props.onClose();
	}

	isApplyEnabled() {
		return this.state.filterList.values.length > 0;
	}

	getApplyText() {
		return 'Filter';
	}

	private invertSelection() {
		const { table, column } = this.props;
		const allValues = getUniqueValuesInColumn(table, column.id);
		const { values: oldActiveValues } = this.state.filterList;
		const values = allValues
			.map((item) => item[0])
			.filter((item) => !oldActiveValues.includes(item));
		const filterList: IFilter = { column, values };
		this.setState({ filterList });
	}
}
