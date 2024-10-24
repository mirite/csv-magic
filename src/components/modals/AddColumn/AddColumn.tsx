import { addColumn } from "modules/column-generation/column-generator";
import {
	Blank,
	Duplicate,
	Lookup,
	Pool,
	Statically,
} from "modules/column-generation/column-generators";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { MappedColumn } from "types";

import type { GenerateColumnStrategy } from "../../../modules/column-generation/column-generators/GenerateColumnStrategy";
import type { BaseModalProps } from "../BaseModal/Modal";
import Modal from "../BaseModal/Modal";

import * as styles from "./AddColumn.module.css";
import ColumnTypeRadio from "./AddColumnOptions/ColumnType";
import DuplicateOptions from "./AddColumnOptions/options/DuplicateOptions";
import LookupOptions from "./AddColumnOptions/options/LookupOptions";
import PoolOptions from "./AddColumnOptions/options/PoolOptions";
import StaticOptions from "./AddColumnOptions/options/StaticOptions";

const columnTypeRadios = {
	Blank: {
		label: "Blank",
		description: "An empty column, nothing magical here.",
		type: Blank,
		OptionsComponent: () => <span>There are no options for blank.</span>,
		default: true,
	},
	Static: {
		label: "Static",
		description:
			"A column filled with a set value, It could be blank if you are really opposed to using the blank option.",
		type: Statically,
		OptionsComponent: (setParams: (value: string) => void) => (
			<StaticOptions onChange={(value: string) => setParams(value)} />
		),
	},
	Lookup: {
		label: "Lookup",
		description:
			"A column filled with data from matches in another open table. Basically a portal.",
		type: Lookup,
		OptionsComponent: (setParams: (value: MappedColumn) => void) => (
			<LookupOptions onChange={(value: MappedColumn) => setParams(value)} />
		),
	},
	Pool: {
		label: "Pool",
		description:
			"A column with values randomly (but evenly) assigned from a pool of available values. (We can pretend it's a cauldron if you want).",
		type: Pool,
		OptionsComponent: (setParams: (value: string[]) => void) => (
			<PoolOptions onChange={(values: string[]) => setParams(values)} />
		),
	},
	Duplicate: {
		label: "Duplicate",
		description: "A column that is an exact clone of a column in this table.",
		type: Duplicate,
		OptionsComponent: (setParams: (value: number) => void) => (
			<DuplicateOptions onChange={(value) => setParams(value)} />
		),
	},
} as const;

type ColumnDefinitions = typeof columnTypeRadios;
type ColumnType = keyof ColumnDefinitions;

const AddColumnModal = (props: BaseModalProps): ReactElement => {
	const { table, onClose } = props;
	const [columnName, setColumnName] = useState<string>("");
	const [columnType, setColumnType] = useState<ColumnType>("Blank");
	const [columnParameters, setColumnParameters] = useState<
		undefined | string | string[] | MappedColumn | number
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
		title: "Add Column",
		applyText: "Add Column",
		onApply: handleApply,
		isValid: !!((columnParameters || columnType === "Blank") && columnName),
		...props,
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
							id="name-input"
							className={styles.input}
							type="text"
							value={columnName}
							onChange={handleNameChange}
						/>
					</div>
					<div className={styles.group}>
						<h3>Column Type:</h3>
						{Object.entries(columnTypeRadios).map(([key, value]) => (
							<ColumnTypeRadio
								key={key}
								label={value.label}
								description={value.description}
								onChange={() => handleTypeChange(key as ColumnType)}
								default={!("default" in value) || value.default}
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

export default AddColumnModal;
