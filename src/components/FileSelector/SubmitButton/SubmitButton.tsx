import type { FunctionComponent } from "react";
import React from "react";

import * as styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
	fileAttached: boolean;
	processing: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
	const { fileAttached, processing } = props;

	const getText = () => {
		if (processing) {
			return "Processing...";
		}
		if (fileAttached) {
			return "Open";
		}
		return "Select a File";
	};

	const isDisabled = processing || !fileAttached;

	return (
		<button
			aria-disabled={isDisabled}
			className={styles.button}
			disabled={isDisabled}
			type="submit"
		>
			{getText()}
		</button>
	);
};

export default SubmitButton;
