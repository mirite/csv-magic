import React, { Component } from 'react';
import FileSelector from './file-selector/FileSelector';
import Editor from './Editor';
import { ITable, IFile } from 'types';
import styles from 'styles/MainView.module.css';

interface IState {}

interface IProps {
	/**
	 * The current open file (if any).
	 */
	table?: ITable;

	/**
	 * The event handler to call when a new file is loaded.
	 */
	onLoad: (file?: IFile) => void;
	onTableChange: (table: ITable) => any;
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
		if (this.props.table) {
			return (
				<Editor
					table={this.props.table}
					onChange={(e: ITable) => this.handleTableChange(e)}
				/>
			);
		}
		return <FileSelector onChange={(data) => this.props.onLoad(data)} />;
	}

	handleTableChange(e: ITable): any {
		this.props.onTableChange(e);
	}

	render() {
		return <div className={styles.container}>{this.getView()}</div>;
	}
}

export default MainView;
