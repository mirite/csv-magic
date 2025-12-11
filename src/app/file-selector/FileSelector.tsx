import { useFileStore, CSVLoader } from "@/lib/index.js";
import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import FileInput from "./FileInput/FileInput.js";
import styles from "./FileSelector.module.css";
import SubmitButton from "./SubmitButton/SubmitButton.js";

export const FileSelector = (): ReactElement => {
	const { addFile, files, setCurrentIndex } = useFileStore();
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [state, setState] = useState<null | { name: string; text: string }>(
		null,
	);

	const handleAttachFile = (e: FormEvent<HTMLInputElement>) => {
		const { files: attachedFiles } = e.currentTarget;
		const file = attachedFiles?.item(0);
		if (file) {
			void file.text().then((fileText) => {
				setState({ name: file.name, text: fileText });
			});
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!state) {
			return;
		}
		setIsProcessing(true);
		void CSVLoader(state.name, state.text).then((file) => {
			if (!file) {
				return;
			}

			addFile(file);
			setCurrentIndex(files.length);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<FileInput onAttachFile={handleAttachFile} />
			<div className={styles.submitButtonContainer}>
				<SubmitButton fileAttached={state !== null} processing={isProcessing} />
			</div>
		</form>
	);
};
