import React, { FunctionComponent } from 'react';

interface FileInputProps {
	onAttachFile: (e: React.ChangeEvent) => unknown;
}

const FileInput: FunctionComponent<FileInputProps> = (props) => {
	const { onAttachFile } = props;
	return (
		<div className="mb-3">
			<label htmlFor="source-file" className="form-label">
				File:
			</label>
			<input
				id="source-file"
				className="form-control"
				accept=".csv"
				onChange={(e) => onAttachFile(e)}
				type="file"
			/>
		</div>
	);
};

export default FileInput;
