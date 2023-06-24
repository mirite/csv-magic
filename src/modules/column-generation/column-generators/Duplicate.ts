import GenerateColumnStrategy from "./GenerateColumnStrategy";
import { Row } from "types";
import { getCellValueByColumnID } from "../../access-helpers";

export class Duplicate extends GenerateColumnStrategy {
  getValue(row: Row | undefined): string {
    const columnID = this.methodParameters as string;
    return getCellValueByColumnID(row as Row, columnID);
  }
}
