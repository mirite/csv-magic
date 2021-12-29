import React, { Component } from 'react';
import { ITable, IFile } from 'types';
import FileSelector from './file-selector/FileSelector';
import styles from 'styles/MainView.module.css';
import Editor from './Editor';

interface IState {}

interface IProps {
	/**
	 * The current open file (if any).
	 */
	file?: ITable;

	/**
	 * The event handler to call when a new file is loaded.
	 */
	onLoad: (file?: IFile) => void;
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
			return <Editor data={this.props.file} />;
		}
		return <FileSelector onChange={(data) => this.props.onLoad(data)} />;
	}

	render() {
		return <div className={styles.container}>{this.getView()}</div>;
	}
}

export default MainView;
