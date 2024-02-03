import { GenerateColumnStrategy } from "./GenerateColumnStrategy";
import { MappedColumn, Row } from "types";
import { getCellValueByColumnID, getRowWithMatchingValueInColumn } from "../../access-helpers";

export const Lookup: GenerateColumnStrategy<MappedColumn> = {
  generate: (row: Row, mappedGenerator: MappedColumn) => {
    const { foreignTable, sourceMatchID, foreignMatchID, foreignImportID } = mappedGenerator;

    const localValue = getCellValueByColumnID(row as Row, sourceMatchID);

    const remoteRow = getRowWithMatchingValueInColumn(foreignTable, foreignMatchID, localValue);

    if (remoteRow) {
      return getCellValueByColumnID(remoteRow, foreignImportID);
    }
    return "";
  },
};
