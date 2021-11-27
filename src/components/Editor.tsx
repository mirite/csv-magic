import React, { Component } from 'react';
import { IFile } from '../modules/csv-loader';
import EditorTab from './EditorTab';
import FilePane from './FilePane';


interface IProps {
}

interface IState {
	files: Array<IFile>;
	currentIndex: number;
}
class Editor extends Component<IProps, IState>{
	constructor(props: IProps) {
		super(props);
		this.state = { files: [{}], currentIndex: 0 };
	}

	handleLoad(file?: IFile) {
		if (!file) return;
		const prevFiles = [...this.state.files];
		prevFiles.push(file);
		const newIndex = prevFiles.length - 1;
		this.setState({ files: prevFiles, currentIndex: newIndex });
	}

	handleClick(index: number) {
		this.setState({ currentIndex: index });
	}


	render() {
		const { currentIndex } = this.state;
		const file = this.state.files[currentIndex];
		return (
			<div>
				<ul className="nav nav-tabs">
					{this.state.files.map((file, index) => <EditorTab key={index} name={file.fileName ?? 'CSV Magic'} onClick={() => this.handleClick(index)} active={index === currentIndex} />)}
				</ul>
				<FilePane file={file.data} onLoad={(file) => this.handleLoad(file)} />
			</div>
		);
	}
}

export default Editor;