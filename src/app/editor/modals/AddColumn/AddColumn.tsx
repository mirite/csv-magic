import {
	addColumn,
	Blank,
	Duplicate,
	Lookup,
	Pool,
	Statically,
	type GenerateColumnStrategy,
} from "@/lib/index.js";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { MappedColumn } from "@/types.js";

import type { ChildModalProps } from "../BaseModal/Modal.js";
import { Modal } from "../BaseModal/Modal.js";

import styles from "./AddColumn.module.css";
import ColumnTypeRadio from "./AddColumnOptions/ColumnType.js";
import DuplicateOptions from "./AddColumnOptions/options/DuplicateOptions.js";
import LookupOptions from "./AddColumnOptions/options/LookupOptions.js";
import PoolOptions from "./AddColumnOptions/options/PoolOptions.js";
import StaticOptions from "./AddColumnOptions/options/StaticOptions.js";

const columnTypeRadios = {
	Blank: {
		default: true,
		description: "An empty column, nothing magical here.",
		label: "Blank",
		OptionsComponent: () => <span>There are no options for blank.</span>,
		type: Blank,
	},
	Duplicate: {
		description: "A column that is an exact clone of a column in this table.",
		label: "Duplicate",
		OptionsComponent: (setParams: (value: number) => void) => (
			<DuplicateOptions onChange={(value) => setParams(value)} />
		),
		type: Duplicate,
	},
	Lookup: {
		description:
			"A column filled with data from matches in another open table. Basically a portal.",
		label: "Lookup",
		OptionsComponent: (setParams: (value: MappedColumn) => void) => (
			<LookupOptions onChange={(value: MappedColumn) => setParams(value)} />
		),
		type: Lookup,
	},
	Pool: {
		description:
			"A column with values randomly (but evenly) assigned from a pool of available values. (We can pretend it's a cauldron if you want).",
		label: "Pool",
		OptionsComponent: (setParams: (value: string[]) => void) => (
			<PoolOptions onChange={(values: string[]) => setParams(values)} />
		),
		type: Pool,
	},
	Static: {
		description:
			"A column filled with a set value, It could be blank if you are really opposed to using the blank option.",
		label: "Static",
		OptionsComponent: (setParams: (value: string) => void) => (
			<StaticOptions onChange={(value: string) => setParams(value)} />
		),
		type: Statically,
	},
} as const;

type ColumnDefinitions = typeof columnTypeRadios;
type ColumnType = keyof ColumnDefinitions;

export const AddColumn = (props: ChildModalProps): ReactElement => {
	const { onClose, table } = props;
	const [columnName, setColumnName] = useState<string>("");
	const [columnType, setColumnType] = useState<ColumnType>("Blank");
	const [columnParameters, setColumnParameters] = useState<
		MappedColumn | number | string | string[] | undefined
	>(undefined);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setColumnName(value);
	};

	const handleTypeChange = (e: ColumnType) => {
		setColumnType(e);
		setColumnParameters(undefined);
	};

	const handleApply = () => {
		const newTable = addColumn<typeof columnParameters>(
			table,
			columnName,
			columnTypeRadios[columnType].type as GenerateColumnStrategy<
				typeof columnParameters
			>,
			columnParameters,
		);
		onClose(newTable);
	};

	const options: React.ComponentProps<typeof Modal> = {
		...props,
		applyText: "Add Column",
		isValid: !!((columnParameters || columnType === "Blank") && columnName),
		onApply: handleApply,
		title: "Add Column",
	};

	return (
		<Modal {...options}>
			<div>
				<div>
					<div className={styles.group}>
						<label htmlFor="name-input">
							<h3>Column Name:</h3>
						</label>
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
						{Object.entries(columnTypeRadios).map(([key, value]) => (
							<ColumnTypeRadio
								default={!("default" in value) || value.default}
								description={value.description}
								key={key}
								label={value.label}
								onChange={() => handleTypeChange(key as ColumnType)}
							/>
						))}
					</div>
					<div className={styles.group}>
						<h3>Options:</h3>
						{columnTypeRadios[columnType].OptionsComponent(setColumnParameters)}
					</div>
				</div>
			</div>
		</Modal>
	);
};
