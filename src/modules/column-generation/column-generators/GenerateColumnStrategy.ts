import { MappedColumn, Row } from "types";

export type StrategyParameters = string | string[] | MappedColumn | undefined;

export default abstract class GenerateColumnStrategy {
  constructor(protected methodParameters: StrategyParameters) {}
  abstract getValue(row?: Row): string;
}
