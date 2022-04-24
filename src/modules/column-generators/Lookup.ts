import GenerateColumnStrategy from './GenerateColumnStrategy';
import { IMappedColumn, IRow } from '../../types';
import {
	getCellValueByColumnID,
	getRowWithMatchingValueInColumn,
} from '../access-helpers';

export class Lookup extends GenerateColumnStrategy {
	getValue(row: IRow | undefined): string {
		const mappedGenerator = this.methodParameters as IMappedColumn;
		const { foreignTable, sourceMatchID, foreignMatchID, foreignImportID } =
			mappedGenerator;

		const localValue = getCellValueByColumnID(row as IRow, sourceMatchID);

		const remoteRow = getRowWithMatchingValueInColumn(
			foreignTable,
			foreignMatchID,
			localValue
		);

		if (remoteRow) {
			return getCellValueByColumnID(remoteRow, foreignImportID);
		}
		return '';
	}
}
