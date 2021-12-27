import React, { Component } from 'react';
import { IFile } from '../types';
import EditorTab from './EditorTab';
import FilePane from './FilePane';

interface IProps {}

interface IState {
	/**
	 * The files currently open in the editor.
	 */
	files: Array<IFile>;
	/**
	 * The file whose tab is currently active.
	 */
	currentIndex: number;
}
class Editor extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { files: [{}], currentIndex: 0 };
	}

	/**
	 * Handles when a new file has been loaded by the FileSelector.
	 *
	 * @param  file The file contents that have just been added.
	 */
	handleLoad(file?: IFile) {
		if (!file) return;

		/**
		 * The files previously loaded.
		 */
		const prevFiles = [...this.state.files];
		prevFiles.push(file);

		/**
		 * The index of the newly loaded file.
		 */
		const newIndex = prevFiles.length - 1;
		this.setState({ files: prevFiles, currentIndex: newIndex });
	}

	/**
	 * Handles the click on an EditorTab.
	 *
	 * @param  index The index of the tab that was clicked.
	 */
	handleTabClick(index: number) {
		this.setState({ currentIndex: index });
	}

	render() {
		const { currentIndex } = this.state;
		/**
		 * The current open file.
		 */
		const currentFile = this.state.files[currentIndex];
		return (
			<div>
				<ul className="nav nav-tabs">
					{this.state.files.map((file, index) => (
						<EditorTab
							key={index}
							label={file.fileName ?? 'CSV Magic'}
							onClick={() => this.handleTabClick(index)}
							active={index === currentIndex}
						/>
					))}
				</ul>
				<FilePane
					file={currentFile.data}
					onLoad={(file) => this.handleLoad(file)}
				/>
			</div>
		);
	}
}

export default Editor;
