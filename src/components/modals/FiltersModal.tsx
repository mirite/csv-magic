import BaseModal, { BaseModalProps } from './BaseModal';
import React from 'react';
import { IFilter, ITable } from 'types';
import { getUniqueValuesInColumn } from 'modules/access-helpers';
import FilterValue from './filter-controls/FilterValue';
import styles from 'styles/FiltersModal.module.css';

interface IProps extends BaseModalProps {
	column: string;
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
			<ul className={styles.list}>
				{getUniqueValuesInColumn(table, column).map((pair) => (
					<FilterValue
						key={pair[0]}
						value={pair[0]}
						count={pair[1]}
						onChange={(value: string, status: boolean) =>
							this.handleChange(value, status)
						}
					/>
				))}
			</ul>
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
			if (existingFilter) return;

			newFilterList.values = [...oldFilterList, valueToToggle];
		}

		this.setState({ filterList: newFilterList });
	}

	handleApply(): void {
		const { filterList } = this.state;
		this.props.onApply(filterList);
		this.props.onClose();
	}
}
