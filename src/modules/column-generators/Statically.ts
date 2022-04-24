import GenerateColumnStrategy from './GenerateColumnStrategy';
import { IRow } from '../../types';

export class Statically extends GenerateColumnStrategy {
	getValue(row: IRow | undefined): string {
		return this.methodParameters as string;
	}
}
