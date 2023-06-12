import GenerateColumnStrategy from "./GenerateColumnStrategy";
import { IRow } from "types";
import { getCellValueByColumnID } from "../../access-helpers";

export class Duplicate extends GenerateColumnStrategy {
  getValue(row: IRow | undefined): string {
    const columnID = this.methodParameters as string;
    return getCellValueByColumnID(row as IRow, columnID);
  }
}
