import { GenerateColumnStrategy } from "./GenerateColumnStrategy";
import { Row } from "types";
import { getCellValueByColumnID } from "../../access-helpers";

export const Duplicate: GenerateColumnStrategy<number> = {
  generate: (row: Row, columnID: number) => {
    return getCellValueByColumnID(row, columnID);
  },
};
