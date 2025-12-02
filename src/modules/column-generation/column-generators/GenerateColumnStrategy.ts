import type { Row } from "types";

export type GenerateColumnStrategy<T> = {
	generate: (row: Row, params: T) => string;
	init?: (params: T) => void;
};
