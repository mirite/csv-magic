import {
	addColumn,
	Blank,
	Duplicate,
	Lookup,
	Pool,
	Statically,
	type GenerateColumnStrategy,
} from "@/lib/index.js";
import type { ChangeEvent, ComponentType, ReactElement } from "react";
import { useState } from "react";
import type { MappedColumn } from "@/types.js";

import type { ChildModalProps } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import styles from "./AddColumn.module.css";
import ColumnTypeRadio from "./ColumnType.js";
import DuplicateOptions from "./options/DuplicateOptions.js";
import LookupOptions from "./options/LookupOptions.js";
import PoolOptions from "./options/PoolOptions.js";
import StaticOptions from "./options/StaticOptions.js";

/**
 * Interface defining the structure of a Column Configuration Entry.
 *
 * @template T - The type of the parameter value expected by the
 *   OptionsComponent.
 */
interface ColumnConfig<T extends ColumnParameterValue> {
	default?: boolean;
	description: string;
	label: string;
	/**
	 * The React Component used to render the options form for this column type.
	 * If undefined, this column type requires no extra parameters.
	 */
	OptionsComponent?: ComponentType<{
		onChange: (value: T) => void;
	}>;
	/**
	 * The Strategy class or object used by the business logic to generate the
	 * column.
	 */
	strategyType: unknown;
}

/**
 * Union type for all possible parameter values across different column
 * strategies.
 */
type ColumnParameterValue =
	| MappedColumn
	| number
	| string
	| string[]
	| undefined;

/**
 * Configuration object mapping column types to their UI and Strategy
 * definitions.
 *
 * We allow 'any' for the OptionsComponent prop type here to simplify the map,
 * but individual strategies are strictly typed in usage.
 */
const COLUMN_CONFIG: Record<string, ColumnConfig<any>> = {
	Blank: {
		description: "An empty column, nothing magical here.",
		label: "Blank",
		strategyType: Blank,
	},
	Duplicate: {
		description: "A column that is an exact clone of a column in this table.",
		label: "Duplicate",
		OptionsComponent: DuplicateOptions,
		strategyType: Duplicate,
	},
	Lookup: {
		description:
			"A column filled with data from matches in another open table. Basically a portal.",
		label: "Lookup",
		OptionsComponent: LookupOptions,
		strategyType: Lookup,
	},
	Pool: {
		description:
			"A column with values randomly (but evenly) assigned from a pool of available values. (We can pretend it's a cauldron if you want).",
		label: "Pool",
		OptionsComponent: PoolOptions,
		strategyType: Pool,
	},
	Static: {
		description:
			"A column filled with a set value. It could be blank if you are really opposed to using the blank option.",
		label: "Static",
		OptionsComponent: StaticOptions,
		strategyType: Statically,
	},
};

type ColumnTypeKey = keyof typeof COLUMN_CONFIG;

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

	const handleApply = () => {
		const config = COLUMN_CONFIG[columnType];

		const strategy = config.strategyType as GenerateColumnStrategy<
			typeof columnParameters
		>;

		const newTable = addColumn(table, columnName, strategy, columnParameters);

		onClose(newTable);
	};
	const currentConfig = COLUMN_CONFIG[columnType];
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
							<OptionsComponent onChange={setColumnParameters} />
						</div>
					) : null}
				</div>
			</div>
		</Modal>
	);
};
