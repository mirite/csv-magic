/**
 *
 * @param data
 */
export function cloneDeep<T extends object>(data: T) {
  return structuredClone(data);
}

/**
 *
 * @param rowID
 * @param columnID
 */
export function createCellID(rowID: number, columnID: number) {
  return rowID + "," + columnID;
}

const indices = {
  row: 0,
  column: 0,
  file: 0,
};

/**
 *
 * @param idType
 */
export function createID(idType: keyof typeof indices) {
  return ++indices[idType];
}
