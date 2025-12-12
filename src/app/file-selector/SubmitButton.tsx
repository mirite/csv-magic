import type { FunctionComponent } from "react";

import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
	fileAttached: boolean;
	processing: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
	const { fileAttached, processing } = props;

	let text = "Select a File";
	if (processing) {
		text = "Processing...";
	}
	if (fileAttached) {
		text = "Open";
	}

	const isDisabled = processing || !fileAttached;

	return (
		<button
			aria-disabled={isDisabled}
			className={styles.button}
			disabled={isDisabled}
			type="submit"
		>
			{text}
		</button>
	);
};

export default SubmitButton;
