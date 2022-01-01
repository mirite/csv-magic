import { OpenFilesContext } from 'components/ViewContainer';
import React, { FunctionComponent, useContext } from 'react';
import { IFile } from 'types';

interface OpenFileSelectorProps {
	onChange: Function;
	currentFile?: IFile;
}

const OpenFileSelector: FunctionComponent<OpenFileSelectorProps> = (props) => {
	const fileContext = useContext(OpenFilesContext);
	const { files } = fileContext;

	const cleanedFiles = files.filter(
		(file) =>
			file.fileName?.trim() &&
			file.fileName !== props.currentFile?.fileName
	);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const fileName = e.currentTarget.value;
		const file = cleanedFiles.find(
			(currentFileInLoop) => currentFileInLoop.fileName === fileName
		);
		props.onChange(file);
	};

	return (
		<div>
			<label htmlFor="select-file">Select File:</label>
			<select id="select-file" onChange={(e) => handleChange(e)}>
				<option value="">Please select a file</option>
				{cleanedFiles.map((file) => (
					<option key={file.fileName} value={file.fileName}>
						{file.fileName}
					</option>
				))}
			</select>
		</div>
	);
};

export default OpenFileSelector;
