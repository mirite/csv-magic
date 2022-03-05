import { IMappedColumn, IRow } from '../../types';

export type StrategyParameters = string | string[] | IMappedColumn | undefined;

export default abstract class GenerateColumnStrategy {
	constructor(protected methodParameters: StrategyParameters) {}
	abstract getValue(row?: IRow): string;
}
