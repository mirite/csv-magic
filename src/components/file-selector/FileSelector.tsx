import React, { Component, FormEvent } from 'react';
import CSVLoader from '../../modules/csv-loader';
import { IFile } from '../../types';
import FileInput from './FileInput';
import SubmitButton from './SubmitButton';
import styles from '../../styles/FileSelector.module.css';

interface IState {
	/**
	 * True indicates that the CSVLoader is currently processing the file.
	 */
	processing: boolean;
	/**
	 * The inner textContent of the CSV file.
	 */
	fileTextContent: string;
	/**
	 * The name of the selected file.
	 */
	fileName: string;
}

interface IProps {
	/**
	 * The event to fire when the CSV file is selected and processed.
	 */
	onChange: (data: IFile) => void;
}

/**
 * Allows a user to select a file and passes that file back to the parent component.
 */
class FileSelector extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { processing: false, fileTextContent: '', fileName: '' };
	}

	/**
	 * Gets the file that was selected and add it to the component state.
	 *
	 * @param  e The form on change even.t
	 */
	async handleAttachFile(e: FormEvent): Promise<void> {
		const { files } = e.target as HTMLInputElement;
		const file = files?.item(0);
		const fileText = await file?.text();
		const fileName = file?.name;
		this.setState({
			fileTextContent: fileText ?? '',
			fileName: fileName ?? 'untitled',
		});
	}

	/**
	 * Takes the selected file and pass it back to the parent component in IFile format.
	 *
	 * @param  e The form submit event.
	 */
	async process(e: FormEvent): Promise<void> {
		e.preventDefault();
		this.setState({ processing: true });
		const data = await CSVLoader(
			this.state.fileName,
			this.state.fileTextContent
		);
		this.props.onChange(data);
	}

	render() {
		const { processing } = this.state;
		return (
			<div>
				<form onSubmit={(e) => this.process(e)}>
					<FileInput onAttachFile={(e) => this.handleAttachFile(e)} />
					<div className={styles.submitButtonContainer}>
						<SubmitButton processing={processing} />
					</div>
				</form>
			</div>
		);
	}
}

export default FileSelector;
