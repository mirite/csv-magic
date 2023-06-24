import GenerateColumnStrategy from "./GenerateColumnStrategy";
import { MappedColumn, Row } from "types";
import {
  getCellValueByColumnID,
  getRowWithMatchingValueInColumn,
} from "../../access-helpers";

export class Lookup extends GenerateColumnStrategy {
  getValue(row: Row | undefined): string {
    const mappedGenerator = this.methodParameters as MappedColumn;
    const { foreignTable, sourceMatchID, foreignMatchID, foreignImportID } =
      mappedGenerator;

    const localValue = getCellValueByColumnID(row as Row, sourceMatchID);

    const remoteRow = getRowWithMatchingValueInColumn(
      foreignTable,
      foreignMatchID,
      localValue
    );

    if (remoteRow) {
      return getCellValueByColumnID(remoteRow, foreignImportID);
    }
    return "";
  }
}
