import { OpenFilesContext } from 'components/ViewContainer';
import React, { FunctionComponent, useContext, useState } from 'react';
import { IFile, IMappedColumn } from 'types';
import KeyInFileSelector from './KeyInFileSelector';
import OpenFileSelector from './OpenFileSelector';

interface LookupOptionsProps {
	onChange: (e: IMappedColumn) => void;
}

const LookupOptions: FunctionComponent<LookupOptionsProps> = (props) => {
	const [otherFile, setOtherFile] = useState<IFile>();
	const activeFile = useContext(OpenFilesContext);

	if (!activeFile.currentFile?.data) return <p>No file active</p>;

	const otherFileKeySelector = () => {
		if (!otherFile?.data) return <p>Please select a file.</p>;
		return (
			<KeyInFileSelector
				table={otherFile?.data}
				label="Key in the other table to match on:"
			/>
		);
	};
	return (
		<div>
			<OpenFileSelector
				onChange={(e: IFile) => setOtherFile(e)}
				currentFile={activeFile.currentFile}
			/>
			<KeyInFileSelector
				table={activeFile.currentFile.data}
				label="Key in this table to match on:"
			/>
			{otherFileKeySelector()}
		</div>
	);
};

export default LookupOptions;
