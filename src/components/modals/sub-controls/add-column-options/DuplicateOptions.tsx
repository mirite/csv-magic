import { OpenFilesContext } from 'components/ViewContainer';
import React, {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
import KeyInFileSelector from '../selects/KeyInFileSelector';

interface LookupOptionsProps {
	onChange: (e: string) => void;
}

const DuplicateOptions: FunctionComponent<LookupOptionsProps> = (props) => {
	const [columnIDToDuplicate, setColumnIDToDuplicate] = useState<string>();

	const activeFile = useContext(OpenFilesContext);
	useEffect(() => {
		if (!columnIDToDuplicate) {
			return;
		}

		props.onChange(columnIDToDuplicate);
	}, [columnIDToDuplicate]);

	if (!activeFile.currentFile?.table) {
		return <p>No file active</p>;
	}

	return (
		<div>
			<KeyInFileSelector
				table={activeFile.currentFile.table}
				label="Key in this table to duplicate:"
				onChange={(key: string) => setColumnIDToDuplicate(key)}
			/>
		</div>
	);
};

export default DuplicateOptions;
