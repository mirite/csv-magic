import DuplicateOptions from "./DuplicateOptions.js";
import LookupOptions from "./LookupOptions.js";
import PoolOptions from "./PoolOptions.js";
import StaticOptions from "./StaticOptions.js";
import type { ColumnConfig } from "../types.js";
import { Blank, Duplicate, Lookup, Pool, Statically } from "@/lib/index.js";

/**
 * Configuration object mapping column types to their UI and Strategy
 * definitions.
 *
 * We allow 'any' for the OptionsComponent prop type here to simplify the map,
 * but individual strategies are strictly typed in usage.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COLUMN_CONFIG: Record<string, ColumnConfig<any>> = {
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

export type ColumnTypeKey = keyof typeof COLUMN_CONFIG;
