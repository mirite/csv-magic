import React, { Component } from 'react';
import { IFile } from '../types';
import ViewTab from './ViewTab';
import MainView from './MainView';

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
class ViewContainer extends Component<IProps, IState> {
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

	/**
	 * Handles the closing of a tab. Removes that tab from the list of open files and moves the current index back one if necessary.
	 *
	 * @param  index The index of the tab to close.
	 */
	handleTabClose(index: number): void {
		const { currentIndex } = this.state;
		let newIndex = currentIndex;
		if (currentIndex === index) {
			newIndex -= 1;
		}

		/**
		 * The new file list with the file that is being closed removed.
		 */
		const remainingFiles = this.state.files.filter(
			(file, i) => i !== index
		);

		this.setState({ files: remainingFiles, currentIndex: newIndex });
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
						<ViewTab
							key={index}
							label={file.fileName ?? 'CSV Magic'}
							onClick={() => this.handleTabClick(index)}
							onClose={() => this.handleTabClose(index)}
							active={index === currentIndex}
							home={index === 0}
						/>
					))}
				</ul>
				<MainView
					file={currentFile.data}
					onLoad={(file) => this.handleLoad(file)}
				/>
			</div>
		);
	}
}

export default ViewContainer;
