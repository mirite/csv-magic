import React, { Component, CSSProperties } from 'react';
import Row, { IRow } from './Row';

export interface ITable extends Array<IRow> { }

interface IProps {
	data: ITable;
}

interface IState {
	style: React.CSSProperties;
}

class Table extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			style: this.createStyle(props)
		};
	}

	createStyle(props: IProps):CSSProperties {
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
			cells.push(<div style={{ backgroundColor: 'grey' }}>{key}</div>)
		}
		return cells;
	}

	render() {
		return (
			<div style={this.state.style}>
				{this.getHeaders()}
				{this.props.data.map((row, index) => <Row key={index} data={row} />)}
				{this.getHeaders()}
			</div>
		);
	}
}

export default Table;
