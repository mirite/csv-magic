import Popover, { PopoverProps } from '../Popover';
import React, { Component } from 'react';
import { ITable } from '../../types';
import { getUniqueValuesInColumn } from '../../modules/access-helpers';
import FilterValue from '../filter-controls/FilterValue';

interface IProps extends PopoverProps {
	column: string;
	table: ITable;
	activeFilters: Array<[string, string]>;
	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: (newFilters: Array<[string, string]>) => void;
}

interface IState {
	filterList: Array<[string, string]>;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class FiltersModal extends Popover<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { filterList: [] };
	}
	getContent(): JSX.Element {
		const { table, column } = this.props;
		return (
			<ul>
				{getUniqueValuesInColumn(table, column).map((pair) => (
					<FilterValue
						key={pair[0]}
						active={this.isActiveFilter(pair)}
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

	isActiveFilter(pair: [string, number]): boolean {
		const { activeFilters } = this.props;
		for (const filter of activeFilters) {
			if (filter[1] === pair[0]) {
				return true;
			}
		}
		return false;
	}

	handleChange(value: string, status: boolean) {
		/**
		 * The filter list previously existing in the state.
		 */
		const oldFilterList = this.state.filterList;

		/**
		 * The new filter list once our change is applied.
		 */
		let newFilterList: Array<[string, string]>;

		//If the filter status was switched to off, we just need the filter list with that filter removed
		//(Even if it was never there to begin with)
		if (!status) {
			newFilterList = oldFilterList.filter((pair) => pair[1] !== value);
		} else {
			/**
			 * Any existing filters on value.
			 */
			const existingFilter = oldFilterList.find(
				(pair) => pair[1] === value
			);

			//If we are already filtering on this value no need to update the state.
			if (existingFilter) return;

			const { column } = this.props;
			newFilterList = [...oldFilterList, [column, value]];
		}

		this.setState({ filterList: newFilterList });
	}

	handleApply(): void {
		const { filterList } = this.state;
		this.props.onApply(filterList);
	}
}
