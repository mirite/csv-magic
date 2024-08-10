import React, { useId } from "react";

interface FileInputProps {
	onAttachFile: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FileInput = (props: FileInputProps) => {
	const { onAttachFile } = props;
	const id = useId();
	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">
				File:
			</label>
			<input
				id={id}
				className="form-control"
				accept=".csv"
				onChange={(e) => onAttachFile(e)}
				type="file"
			/>
		</div>
	);
};

export default FileInput;
