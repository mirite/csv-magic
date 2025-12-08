import type { Row } from "@/types.js";

import { getCellValueByColumnID } from "@/lib/index.js";

import type { GenerateColumnStrategy } from "./GenerateColumnStrategy.js";

export const Duplicate: GenerateColumnStrategy<number> = {
	generate: (row: Row, columnID: number) => {
		return getCellValueByColumnID(row, columnID);
	},
};
