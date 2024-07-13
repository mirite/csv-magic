import type { Row } from "types";

export type GenerateColumnStrategy<T> = {
  init?: (params: T) => void;
  generate: (row: Row, params: T) => string;
};
