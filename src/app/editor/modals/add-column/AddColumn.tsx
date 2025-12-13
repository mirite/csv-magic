import { addColumn, type GenerateColumnStrategy } from "@/lib/index.js";
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";

import type { ChildModalProps } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import styles from "./AddColumn.module.css";
import ColumnTypeRadio from "./ColumnType.js";
import type { ColumnParameterValue } from "./types.js";
import { COLUMN_CONFIG, type ColumnTypeKey } from "./options/index.js";

export const AddColumn = (props: ChildModalProps): ReactElement => {
	const { onClose, table } = props;
	const [columnName, setColumnName] = useState("");
	const [columnType, setColumnType] = useState<ColumnTypeKey>("Blank");
	const [columnParameters, setColumnParameters] =
		useState<ColumnParameterValue>(undefined);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setColumnName(value);
	};

	const handleTypeChange = (e: ColumnTypeKey) => {
		setColumnType(e);
		setColumnParameters(undefined);
	};

	const currentConfig = COLUMN_CONFIG[columnType];
	const handleApply = () => {
		const strategy = currentConfig.strategyType as GenerateColumnStrategy<
			typeof columnParameters
		>;

		const newTable = addColumn(table, columnName, strategy, columnParameters);

		onClose(newTable);
	};
	const OptionsComponent = currentConfig.OptionsComponent;

	const isParamsValid = OptionsComponent ? !!columnParameters : true;
	const isValid = !!columnName && isParamsValid;
	return (
		<Modal
			applyText="Add Column"
			isValid={isValid}
			onApply={handleApply}
			title="Add Column"
			{...props}
		>
			<div>
				<div className={styles.group}>
					<label htmlFor="name-input">Column Name:</label>
					<input
						className={styles.input}
						id="name-input"
						onChange={handleNameChange}
						type="text"
						value={columnName}
					/>
				</div>
				<div className={styles.group}>
					<h3>Column Type:</h3>
					{Object.entries(COLUMN_CONFIG).map(([key, value]) => (
						<ColumnTypeRadio
							checked={columnType === key}
							description={value.description}
							key={key}
							label={value.label}
							onChange={() => handleTypeChange(key)}
						/>
					))}
				</div>
				{OptionsComponent ? (
					<div className={styles.group}>
						<h3>Options:</h3>
						<OptionsComponent
							onChange={setColumnParameters}
							value={columnParameters}
						/>
					</div>
				) : null}
			</div>
		</Modal>
	);
};
