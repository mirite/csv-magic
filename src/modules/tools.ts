import _ from "lodash";

export function cloneDeep(data: object) {
  return _.cloneDeep(data);
}

export function createCellID(rowID: number, columnID: number): string {
  return rowID + "," + columnID;
}

const indices = {
  row: 0,
  column: 0,
  file: 0,
};

export function createID(idType: keyof typeof indices) {
  return ++indices[idType];
}
