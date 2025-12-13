import { countOccurrences, findAndReplaceInColumn } from "@/lib/index.js";
import type { ChangeEvent, ReactElement } from "react";
import { useMemo, useState } from "react";

import type { ChildModalPropsWithColumn } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import styles from "./FindAndReplaceModal.module.css";

export const FindAndReplace = (
	props: ChildModalPropsWithColumn,
): ReactElement => {
	const { column, onClose, table } = props;
	const [findValue, setFindValue] = useState("");
	const [replaceValue, setReplaceValue] = useState("");

	const handleFindChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFindValue(e.currentTarget.value);
	};

	const handleReplaceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setReplaceValue(e.currentTarget.value);
	};

	const handleApply = () => {
		const newTable = findAndReplaceInColumn(
			table,
			column,
			findValue,
			replaceValue,
		);
		onClose(newTable);
	};

	const testResult = useMemo(() => {
		const result = countOccurrences(table, column.id, findValue);
		let message = "";
		if (result === 0) {
			message = "This query will not affect any rows";
		} else if (result === 1) {
			message = `${result} row affected`;
		} else {
			message = `${result} rows affected`;
		}
		return message;
	}, [table, column.id, findValue]);

	return (
		<Modal
			{...props}
			applyText="Replace"
			isValid={findValue !== ""}
			onApply={handleApply}
			title="Find and Replace In Column"
		>
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
