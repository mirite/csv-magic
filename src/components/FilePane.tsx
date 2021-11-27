import React, { Component } from 'react';
import FileSelector from './FileSelector';
import Table, { ITable } from './Table';

interface IState {
	file: ITable;
}

interface IProps { }

class FilePane extends Component<IProps, IState>{
	constructor(props: IProps) {
		super(props);
		this.state = { file: [{ a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 }, { g: 7, h: 8, i: 9 }] }
	}

	render() {
		return (
			<div>
				<FileSelector onChange={(data) => this.setState({file:data}) } />
				<Table data={ this.state.file } />
			</div>
		);
	}
}

export default FilePane;