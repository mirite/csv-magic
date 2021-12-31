import { OpenFilesContext } from 'components/ViewContainer';
import React, {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
import { IFile, IMappedColumn } from 'types';
import KeyInFileSelector from '../selects/KeyInFileSelector';
import OpenFileSelector from '../selects/OpenFileSelector';

interface LookupOptionsProps {
	onChange: (e: IMappedColumn) => void;
}

const LookupOptions: FunctionComponent<LookupOptionsProps> = (props) => {
	const [otherFile, setOtherFile] = useState<IFile>();
	const [sourceMatchKey, setSourceMatchKey] = useState<string>();
	const [foreignMatchKey, setForeignMatchKey] = useState<string>();
	const [foreignImportKey, setForeignImportKey] = useState<string>();

	const activeFile = useContext(OpenFilesContext);
	useEffect(() => {
		const foreignTable = otherFile?.data;
		if (
			!foreignTable ||
			!sourceMatchKey ||
			!foreignMatchKey ||
			!foreignImportKey
		) {
			return;
		}
		const mappedColumn: IMappedColumn = {
			foreignTable,
			sourceMatchKey,
			foreignMatchKey,
			foreignImportKey,
		};
		props.onChange(mappedColumn);
	}, [foreignMatchKey, sourceMatchKey, otherFile, foreignImportKey]);

	if (!activeFile.currentFile?.data) return <p>No file active</p>;

	const otherFileKeySelector = () => {
		if (!otherFile?.data) return <p>Please select a file.</p>;
		return (
			<div>
				<KeyInFileSelector
					table={otherFile?.data}
					label="Key in the other table to match on:"
					onChange={(key: string) => setForeignMatchKey(key)}
				/>
				<KeyInFileSelector
					table={otherFile?.data}
					label="Key in the other table to import:"
					onChange={(key: string) => setForeignImportKey(key)}
				/>
			</div>
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
				onChange={(key: string) => setSourceMatchKey(key)}
			/>
			{otherFileKeySelector()}
		</div>
	);
};

export default LookupOptions;
