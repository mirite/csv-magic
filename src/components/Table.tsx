import React, { Component, CSSProperties } from 'react';
import Row, { IRow } from './Row';

export interface ITable extends Array<IRow> { }

interface IProps {
	data: ITable;
}

interface IState {
	style: React.CSSProperties;
	activeFilters: Array<(table: ITable) => ITable>;
	activeSorts: Array<(table: ITable) => ITable>;
}

class Table extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			style: this.createStyle(props),
			activeFilters: [],
			activeSorts: []
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

	getHeaders() {
		const cells = [];
		for (const [key, value] of Object.entries(this.props.data[0])) {
			cells.push(
				<div style={{ backgroundColor: 'grey', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
					<span className="m-1"><strong>{key}</strong></span>
					<button className="btn btn-primary m-1">Sort</button>
					<button className="btn btn-primary m-1">Filter</button>
				</div>
			)
		}
		return cells;
	}

	applyFiltersAndSorting() {
		return this.props.data;
	}

	render() {
		const activeData = this.applyFiltersAndSorting();
		return (
			<div style={this.state.style}>
				{this.getHeaders()}
				{activeData.map((row, index) => <Row key={index} data={row} />)}
				{this.getHeaders()}
			</div>
		);
	}
}

export default Table;
