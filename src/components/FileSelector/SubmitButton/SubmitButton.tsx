import type { FunctionComponent } from "react";
import React from "react";

import * as styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
	processing: boolean;
	fileAttached: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
	const { processing, fileAttached } = props;

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
			className={styles.button}
			type="submit"
			aria-disabled={isDisabled}
			disabled={isDisabled}
		>
			{getText()}
		</button>
	);
};

export default SubmitButton;
