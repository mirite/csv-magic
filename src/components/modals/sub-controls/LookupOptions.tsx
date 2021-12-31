import { OpenFilesContext } from 'components/ViewContainer';
import React, {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
import { IFile, IMappedColumn } from 'types';
import KeyInFileSelector from './KeyInFileSelector';
import OpenFileSelector from './OpenFileSelector';

interface LookupOptionsProps {
	onChange: (e: IMappedColumn) => void;
}

const LookupOptions: FunctionComponent<LookupOptionsProps> = (props) => {
	const [otherFile, setOtherFile] = useState<IFile>();
	const [sourceKey, setSourceKey] = useState<string>();
	const [targetKey, setTargetKey] = useState<string>();

	const activeFile = useContext(OpenFilesContext);
	useEffect(() => {
		const secondaryTable = otherFile?.data;
		if (!secondaryTable || !sourceKey || !targetKey) {
			return;
		}
		const mappedColumn: IMappedColumn = {
			secondaryTable,
			sourceKey,
			targetKey,
		};
		props.onChange(mappedColumn);
	}, [targetKey, sourceKey, otherFile]);

	if (!activeFile.currentFile?.data) return <p>No file active</p>;

	const otherFileKeySelector = () => {
		if (!otherFile?.data) return <p>Please select a file.</p>;
		return (
			<KeyInFileSelector
				table={otherFile?.data}
				label="Key in the other table to match on:"
				onChange={(key: string) => setTargetKey(key)}
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
				onChange={(key: string) => setSourceKey(key)}
			/>
			{otherFileKeySelector()}
		</div>
	);
};

export default LookupOptions;
