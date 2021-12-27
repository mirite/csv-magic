import React, { Component, Fragment } from 'react';
import Row from './table-parts/Row';
import Sorting from '../modules/sorting';
import Filters from './Filters';
import { ITable } from '../types';
import TableHeadings from './table-parts/TablesHeadings';

interface IProps {
	data: ITable;
}

interface IState {
	activeFilters: Array<[string, string]>;
	activeSorts: Array<[string, boolean]>;
	activeData: ITable;
	filtersShowing: boolean;
	activeCell?: string;
}

class Table extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			activeFilters: [],
			activeSorts: [],
			activeData: props.data,
			filtersShowing: false,
			activeCell: props.data.firstCellId,
		};
	}

	handleSort(key: string) {
		const { activeSorts, activeData } = this.state;
		const newSorts = Sorting.setSort([...activeSorts], key);
		const newData = Sorting.applySorting(activeData, newSorts);
		this.setState({ activeSorts: newSorts, activeData: newData });
	}

	getHeaders() {
		const row = this.props.data[0];
		return (
			<TableHeadings
				exampleRow={row}
				activeSorts={this.state.activeSorts}
				onSort={(key: string) => this.handleSort(key)}
				onShowFilter={(key: string) => this.handleShowFilter(key)}
			/>
		);
	}

	getHead() {
		const headings = this.getHeaders();
		return <thead>{headings}</thead>;
	}

	getFoot() {
		const headings = this.getHeaders();
		return <tfoot>{headings}</tfoot>;
	}

	handleApply(): void {
		throw new Error('Method not implemented.');
	}
	handleClose(): void {
		this.setState({ filtersShowing: false });
	}

	getModals() {
		if (this.state.filtersShowing) {
			return (
				<Filters
					title="Filter"
					onClose={() => this.handleClose()}
					onApply={() => this.handleApply()}
				/>
			);
		}
	}

	handleShowFilter(key: string) {
		this.setState({ filtersShowing: true });
	}

	render() {
		const { activeData } = this.state;
		return (
			<Fragment>
				<table>
					{this.getHead()}
					<tbody>
						{activeData.map((row) => (
							<Row
								key={row.id}
								data={row}
								activeCell={this.state.activeCell}
							/>
						))}
					</tbody>
					{this.getFoot()}
				</table>
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Table;
