import React, { Component } from 'react';
import MainView from './MainView';
import { IFile, IFileHistory, ISorts, ITable } from 'types';
import ViewTabs from './ViewTabs';
import { cloneDeep } from 'modules/tools';

interface IFilesContext {
	files: Array<IFile>;
	currentFile: IFile | undefined;
}
export const OpenFilesContext = React.createContext<IFilesContext>({
	files: [],
	currentFile: undefined,
});

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
		this.state = { files: [], currentIndex: -1 };
	}

	/**
	 * Handles when a new file has been loaded by the FileSelector.
	 *
	 * @param  file The file contents that have just been added.
	 */
	handleLoad(file?: IFile) {
		if (!file) {
			return;
		}

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
		const { currentIndex, files } = this.state;
		/**
		 * The current open file.
		 */
		const currentFile = this.state.files[currentIndex];

		return (
			<OpenFilesContext.Provider value={{ files, currentFile }}>
				<div>
					<ViewTabs
						files={files}
						currentIndex={currentIndex}
						onTabClick={(e) => this.handleTabClick(e)}
						onTabClose={(e) => this.handleTabClose(e)}
					/>
					<MainView
						file={currentFile}
						onLoad={(file) => this.handleLoad(file)}
						onTableChange={(
							table: ITable,
							sorts: ISorts,
							history: IFileHistory
						) => this.handleTableChange(table, sorts, history)}
					/>
				</div>
			</OpenFilesContext.Provider>
		);
	}

	handleTableChange(
		table: ITable,
		sorts: ISorts,
		history: IFileHistory
	): any {
		const files = cloneDeep(this.state.files) as IFile[];
		const file = files[this.state.currentIndex];
		file.table = table;
		file.activeSorts = sorts;
		file.history = history;
		this.setState({ files });
	}
}

export default ViewContainer;
