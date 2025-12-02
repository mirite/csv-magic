import type { MappedColumn, Row } from "types";

import {
	getCellValueByColumnID,
	getRowWithMatchingValueInColumn,
} from "../../access-helpers";

import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Lookup: GenerateColumnStrategy<MappedColumn> = {
	generate: (row: Row, mappedGenerator: MappedColumn) => {
		const { foreignImportID, foreignMatchID, foreignTable, sourceMatchID } =
			mappedGenerator;

		const localValue = getCellValueByColumnID(row, sourceMatchID);

		const remoteRow = getRowWithMatchingValueInColumn(
			foreignTable,
			foreignMatchID,
			localValue,
		);

		if (remoteRow) {
			return getCellValueByColumnID(remoteRow, foreignImportID);
		}
		return "";
	},
};
