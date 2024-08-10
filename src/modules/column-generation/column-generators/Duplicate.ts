import type { Row } from "types";

import { getCellValueByColumnID } from "../../access-helpers";

import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Duplicate: GenerateColumnStrategy<number> = {
	generate: (row: Row, columnID: number) => {
		return getCellValueByColumnID(row, columnID);
	},
};
