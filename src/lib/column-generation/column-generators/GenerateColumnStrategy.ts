import type { Row } from "@/types.js";

export type GenerateColumnStrategy<T> = {
	generate: GenerateColumnStrategyGenerator<T>;
	init?: (params: T) => unknown;
};

type GenerateColumnStrategyGenerator<TData> = (
	row: Row,
	parmas: TData,
) => string;
