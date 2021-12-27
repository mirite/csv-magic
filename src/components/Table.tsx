import React, { Component, CSSProperties, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV, faArrowUp, faArrowDown, faFilter, faFill, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Row from './Row';
import Sorting from '../modules/sorting';
import Filters from './Filters';
import { ITable } from '../types';



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

enum ESorts {
	None,
	Ascending,
	Descending
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

	getSortStateIcon(key: string): IconDefinition {
		const sort = this.state.activeSorts.find(e => e[0] === key)
		if (!sort) return faArrowsAltV;
		if (sort[1]) return faArrowUp;
		return faArrowDown;
	}

	handleSort(key: string) {
		const { activeSorts, activeData } = this.state;
		const newSorts = Sorting.setSort([...activeSorts], key);
		const newData = Sorting.applySorting(activeData, newSorts);
		this.setState({ activeSorts: newSorts, activeData: newData })
	}

	getHeaders() {
		const cells = [];
		for (const cell of this.props.data[0]) {
			const { key } = cell;
			cells.push(
				<th scope="col" key={cell.key} >
					<div style={{ backgroundColor: 'grey', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
						<span className="m-1"><strong>{key}</strong></span>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<button className="btn btn-primary m-1"><FontAwesomeIcon icon={faSearch} /></button>
							<button className="btn btn-primary m-1" onClick={() => this.showFilters(key)}><FontAwesomeIcon icon={faFilter} /></button>
							<button className="btn btn-primary m-1" onClick={() => this.handleSort(key)}><FontAwesomeIcon icon={this.getSortStateIcon(key)} /></button>
						</div>
					</div>
				</th>
			)
		}
		return <tr>{cells}</tr>;
	}

	getHead() {
		const cells = this.getHeaders();
		return <thead>{cells}</thead>;
	}

	getFoot() {
		const cells = this.getHeaders();
		return <tfoot>{cells}</tfoot>;
	}

	handleApply(): void {
		throw new Error('Method not implemented.');
	}
	handleClose(): void {
		this.setState({filtersShowing: false});
	}

	getModals() {
		if (this.state.filtersShowing) {
			return 	<Filters title='Filter' onClose={() => this.handleClose()} onApply={() => this.handleApply()}/>
		}
	}

	showFilters(key: string) {
		this.setState({'filtersShowing':true})
	}

	render() {
		const { activeData } = this.state;
		return (
			<Fragment>
				<table>
					{this.getHead()}
					<tbody>
						{activeData.map((row) => <Row key={row.id} data={row} activeCell={this.state.activeCell} />)}
					</tbody>
					{this.getFoot()}
				</table>
				{this.getModals()}
			</Fragment>

		);
	}
}

export default Table;
