import Popover, { PopoverProps } from '../Popover';
import React, { Component } from 'react';
import { ITable } from '../../types';
import { getUniqueValuesInColumn } from '../../modules/access-helpers';

interface IProps extends PopoverProps {
	column: string;
	table: ITable;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class Filters extends Popover<IProps> {
	getContent(): JSX.Element {
		const { table, column } = this.props;
		return (
			<ul>
				{getUniqueValuesInColumn(table, column).map((pair) => (
					<li key={pair[0]}>
						{pair[0]} {pair[1]}
					</li>
				))}
			</ul>
		);
	}
}
