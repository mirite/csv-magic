import React, { Component } from 'react';
import FileSelector from './file-selector/FileSelector';
import Editor from './Editor';
import { ITable, IFile, IFileHistory, ISorts } from 'types';
import styles from 'styles/MainView.module.css';

interface IState {}

interface IProps {
	/**
	 * The current open file (if any).
	 */
	file?: IFile;

	/**
	 * The event handler to call when a new file is loaded.
	 */
	onLoad: (file?: IFile) => void;
	onTableChange: (table: ITable, sorts: ISorts, history: IFileHistory) => any;
}

/**
 * A pane for a file. Shows the open file dialog if there isn't a file yet, or the file if there is.
 */
class MainView extends Component<IProps, IState> {
	/**
	 * Returns The appropriate view based on whether or not the FilePane has a file open.
	 *
	 * @return The appropriate view based on whether or not the FilePane has a file open.
	 */
	getView() {
		if (this.props.file) {
			return (
				<Editor
					file={this.props.file}
					onChange={(
						table: ITable,
						sorts: ISorts,
						history: IFileHistory
					) => this.handleTableChange(table, sorts, history)}
				/>
			);
		}
		return <FileSelector onChange={(data) => this.props.onLoad(data)} />;
	}

	handleTableChange(
		table: ITable,
		sorts: ISorts,
		history: IFileHistory
	): any {
		this.props.onTableChange(table, sorts, history);
	}

	render() {
		return <div>{this.getView()}</div>;
	}
}

export default MainView;
