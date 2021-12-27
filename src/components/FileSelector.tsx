import React, { Component, FormEvent } from 'react';
import CSVLoader from '../modules/csv-loader';
import { IFile } from '../types';

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
	 * Gets the file that was selected and add it to the componenet state.
	 *
	 * @param  e The form on change even.t
	 */
	async attachFile(e: FormEvent): Promise<void> {
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
		return (
			<div>
				<form onSubmit={(e) => this.process(e)}>
					<div className="mb-3">
						<label htmlFor="source-file" className="form-label">
							File:
						</label>
						<input
							id="source-file"
							className="form-control"
							onChange={(e) => this.attachFile(e)}
							type="file"
						/>
					</div>
					<div className="mb-3 text-end">
						<button
							className="btn btn-primary btn-lg"
							disabled={this.state.processing}
						>
							{this.state.processing ? 'Processing' : 'Open'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default FileSelector;
