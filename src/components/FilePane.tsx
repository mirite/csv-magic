import React, { Component } from 'react';
import { IFile } from '../modules/csv-loader';
import FileSelector from './FileSelector';
import Table, { ITable } from './Table';

interface IState {

}

interface IProps {
	file?: ITable;
	onLoad: (file?: IFile) => void;
}

class FilePane extends Component<IProps, IState>{
	constructor(props: IProps) {
		super(props);
		this.state = { file: [{ a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 }, { g: 7, h: 8, i: 9 }] }
	}

	getView() {
		if (this.props.file) {
			return <Table data={this.props.file} />
		} else {
			return <FileSelector onChange={(data) => this.props.onLoad(data)} />
		}
	}

	render() {
		return (
			<div>
				{this.getView()}
			</div>
		);
	}
}

export default FilePane;