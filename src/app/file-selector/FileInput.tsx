import type { ReactElement } from "react";
import React, { useId } from "react";

interface FileInputProps {
	onAttachFile: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FileInput = (props: FileInputProps): ReactElement => {
	const { onAttachFile } = props;
	const id = useId();
	return (
		<div className="mb-3">
			<label className="form-label" htmlFor={id}>
				File:
			</label>
			<input
				accept=".csv"
				className="form-control"
				id={id}
				onChange={onAttachFile}
				type="file"
			/>
		</div>
	);
};

export default FileInput;
