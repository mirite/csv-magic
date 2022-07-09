import GenerateColumnStrategy from './GenerateColumnStrategy';
import { IRow } from 'types';

export class Blank extends GenerateColumnStrategy {
	getValue(row: IRow): string {
		return '';
	}
}
