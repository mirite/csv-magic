import { countOccurrences, findAndReplaceInColumn } from "@/lib/index.js";
import type { ReactElement } from "react";
import React, { useState } from "react";

import type { ChildModalPropsWithColumn } from "../BaseModal/Modal.js";
import { Modal } from "../BaseModal/Modal.js";

import styles from "./FindAndReplaceModal.module.css";

export const FindAndReplace = (
	props: ChildModalPropsWithColumn,
): ReactElement => {
	const { column, onClose, table } = props;
	const [findValue, setFindValue] = useState("");
	const [replaceValue, setReplaceValue] = useState("");
	const [testResult, setTestResult] = useState(
		"Test to see how many rows this will impact.",
	);

	const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;
		setFindValue(value);
	};

	const handleReplaceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		const { value } = e.target;
		setReplaceValue(value);
	};

	const handleApply = (): void => {
		const newTable = findAndReplaceInColumn(
			table,
			column,
			findValue,
			replaceValue,
		);
		onClose(newTable);
	};

	const testQuery = (): number => {
		const result = countOccurrences(table, column.id, findValue);
		let message: string;
		if (result === 0) {
			message = "This query will not affect any rows";
		} else if (result === 1) {
			message = `${result} row affected`;
		} else {
			message = `${result} rows affected`;
		}
		setTestResult(message);
		return result;
	};

	const options: React.ComponentProps<typeof Modal> = {
		...props,
		applyText: "Replace",
		isValid: findValue !== "",
		onApply: handleApply,
		title: "Find and Replace In Column",
	};

	return (
		<Modal {...options}>
			<div>
				<p>Searching in &quot;{column.label}&quot;</p>
				<div className={styles.container}>
					<div className={styles.group}>
						<label htmlFor="find-input">Find:</label>
						<input
							className={styles.input}
							id="find-input"
							onChange={handleFindChange}
							type="text"
							value={findValue}
						/>
					</div>

					<div className={styles.group}>
						<label htmlFor="replace-input">Replace:</label>
						<input
							className={styles.input}
							id="replace-input"
							onChange={handleReplaceChange}
							type="text"
							value={replaceValue}
						/>
					</div>
				</div>
				<div className={styles.tester}>
					type={"button"}
					<button className={styles.button} onClick={testQuery} type={"button"}>
						Test
					</button>
					<input
						className={styles.output}
						readOnly
						type="text"
						value={testResult}
					/>
				</div>
			</div>
		</Modal>
	);
};
