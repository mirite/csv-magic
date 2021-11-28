import React, { Component, CSSProperties, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV, faArrowUp, faArrowDown, faFilter, faFill, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Row, { IRow } from './Row';
import Sorting from '../modules/sorting';
import Filters from './Filters';

export interface ITable extends Array<IRow> { }

interface IProps {
	data: ITable;
}

interface IState {
	style: React.CSSProperties;
	activeFilters: Array<[string, string]>;
	activeSorts: Array<[string, boolean]>;
	activeData: ITable;
	filtersShowing: boolean;
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
			style: this.createStyle(props),
			activeFilters: [],
			activeSorts: [],
			activeData: props.data,
			filtersShowing: false
		};
	}

	createStyle(props: IProps): CSSProperties {
		const cols = Object.keys(props.data[0]).length;
		const rows = props.data.length + 2;
		const colTemplate = 'minmax(min-content, max-content) '.repeat(cols);
		return {
			display: 'grid', gridTemplateColumns: colTemplate, gridTemplateRows: `repeat(${rows}, 1fr)`,
		};
	}

	componentDidUpdate(prevProps: IProps, prevState: IState) {
		if (this.props != prevProps) {
			this.setState({ style: this.createStyle(this.props) })
		}
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
		for (const [key, value] of Object.entries(this.props.data[0])) {
			cells.push(
				<div key={key} style={{ backgroundColor: 'grey', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
					<span className="m-1"><strong>{key}</strong></span>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<button className="btn btn-primary m-1"><FontAwesomeIcon icon={faSearch} /></button>
						<button className="btn btn-primary m-1" onClick={() => this.showFilters(key)}><FontAwesomeIcon icon={faFilter} /></button>
						<button className="btn btn-primary m-1" onClick={() => this.handleSort(key)}><FontAwesomeIcon icon={this.getSortStateIcon(key)} /></button>
					</div>
				</div>
			)
		}
		return cells;
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
				<div style={this.state.style}>
					{this.getHeaders()}
					{activeData.map((row, index) => <Row key={index} data={row} />)}
					{this.getHeaders()}
				</div>
				{this.getModals()}
			</Fragment>

		);
	}
}

export default Table;
