import { useFileStore, CSVLoader } from "@/lib/index.js";
import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import FileInput from "./FileInput/FileInput.js";
import styles from "./FileSelector.module.css";
import SubmitButton from "./SubmitButton/SubmitButton.js";

export const FileSelector = (): ReactElement => {
	const { addFile, files, setCurrentIndex } = useFileStore();
	const [processing, setProcessing] = useState<boolean>(false);
	const [fileTextContent, setFileTextContent] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [fileAttached, setFileAttached] = useState<boolean>(false);

	const handleAttachFile = async (e: FormEvent<HTMLInputElement>) => {
		const { files: attachedFiles } = e.currentTarget;
		const file = attachedFiles?.item(0);
		if (file) {
			const fileText = await file.text();
			setFileTextContent(fileText);
			setFileName(file.name);
			setFileAttached(true);
		}
	};

	const process = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		setProcessing(true);
		const file = await CSVLoader(fileName, fileTextContent);

		if (!file) {
			return;
		}

		addFile(file);
		setCurrentIndex(files.length);
	};

	return (
		<div>
			<form
				onSubmit={(e) => {
					void process(e);
				}}
			>
				<FileInput
					onAttachFile={(e) => {
						void handleAttachFile(e);
					}}
				/>
				<div className={styles.submitButtonContainer}>
					<SubmitButton fileAttached={fileAttached} processing={processing} />
				</div>
			</form>
		</div>
	);
};
