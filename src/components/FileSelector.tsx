import React, { Component, FormEvent } from 'react';
import CSVLoader from '../modules/csv-loader';
import { ITable } from './Table';

interface IState {
	processing: boolean;
	fileText: string;
}

interface IProps {
	onChange: (data:ITable) => void;
}

class FileSelector extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = { processing: false, fileText: '' };
	}


	async attachFile(e: FormEvent): Promise<void> {
		const files = (e.target as HTMLInputElement).files;
		const file = files?.item(0);
		const fileText = await file?.text();
		this.setState({ 'fileText': fileText ? fileText : '' });
	}

	async process(e: FormEvent): Promise<void> {
		e.preventDefault();
		this.setState({ 'processing': true });
		const data = await CSVLoader(this.state.fileText);
		this.props.onChange(data);
	}
	render() {
		return (
			<div>
				<form onSubmit={(e) => this.process(e)}>
					<div className="mb-3">
						<label htmlFor='source-file' className='form-label'>File:</label>
						<input id='source-file' className='form-control' onChange={(e) => this.attachFile(e)} type='file' />
					</div>
					<div className="mb-3 text-end">
						<button className="btn btn-primary btn-lg" disabled={this.state.processing}>{this.state.processing ? 'Processing' : 'Open'}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default FileSelector;