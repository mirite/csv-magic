import React, { Component } from 'react';
import { ITable, IFile } from '../types';
import FileSelector from './FileSelector';
import Table from './Table';

interface IState {

}

interface IProps {
	file?: ITable;
	onLoad: (file?: IFile) => void;
}

class FilePane extends Component<IProps, IState>{
	constructor(props: IProps) {
		super(props);
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
			<div style={{overflowX:'auto'}}>
				{this.getView()}
			</div>
		);
	}
}

export default FilePane;