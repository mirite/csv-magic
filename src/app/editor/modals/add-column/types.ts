import type { MappedColumn } from "@/types.js";
import type { ComponentType } from "react";

export type AddColumnComponentProps<T extends ColumnParameterValue> = {
	onChange: (newValue: T) => unknown;
	value: T;
};

/**
 * Interface defining the structure of a Column Configuration Entry.
 *
 * @template T - The type of the parameter value expected by the
 *   OptionsComponent.
 */
export interface ColumnConfig<T extends ColumnParameterValue> {
	default?: boolean;
	description: string;
	label: string;
	/**
	 * The React Component used to render the options form for this column type.
	 * If undefined, this column type requires no extra parameters.
	 */
	OptionsComponent?: ComponentType<AddColumnComponentProps<T>>;
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
export type ColumnParameterValue =
	| MappedColumn
	| number
	| string
	| string[]
	| undefined;
