import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

/**
 * Returns a unique identifier (Prefixed if provided)
 *
 * @param  prefix The label to put before the id (if any)
 * @return A unique identifier (Prefixed if provided)
 */
export function createUUID(prefix?: string): string {
  return (prefix ?? "") + uuidv4();
}

export function cloneDeep(data: object) {
  return _.cloneDeep(data);
}

export function createCellID(rowID: string, columnID: string): string {
  return rowID + "?" + columnID;
}
