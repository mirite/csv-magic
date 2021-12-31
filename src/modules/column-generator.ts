import _ from 'lodash';
import { EGeneratorTypes, ICell, IMappedColumn, IRow, ITable } from 'types';
import {
	getColumnIndex,
	getRowWithMatchingValueInColumn,
} from './access-helpers';

/**
 * Adds a new column to a table and fills it with values using the method and parameters provided.
 *
 * @param  data             The table to add the column to.
 * @param  newColumnName    The name of the new column
 * @param  method           The method used to create the new values.
 * @param  methodParameters The options used by the method selected.
 * @return A new table with the column added.
 */
export function addColumn(
	data: ITable,
	newColumnName: string,
	method: EGeneratorTypes,
	methodParameters: string | string[] | IMappedColumn | undefined
): ITable {
	/**
	 * Adds a cell to the provided row.
	 *
	 * @param  row The row that the cell should be added to.
	 */
	const addCellToRow = (row: IRow): void => {
		/**
		 * The value of the new cell populated by the method provided.
		 */
		const cellValue = generateCellValue(row);

		/**
		 * The new cell to add to the row.
		 */
		const newCell: ICell = {
			id: row.id + '?' + String(row.contents.length),
			key: newColumnName,
			value: cellValue,
		};
		row.contents.push(newCell);
	};

	/**
	 * Generator to evenly assign values from the pool of strings provided.
	 * Starts at a random index and loops from there.
	 *
	 * @return The next string in the pool.
	 */
	const poolValuesGenerator = function* () {
		/**
		 * The list of strings that can be assigned from.
		 */
		const poolValues = methodParameters as Array<string>;

		/**
		 * The current index within the pool values that are being cycled through.
		 */
		let poolValueIndex = _.random(0, poolValues.length - 1, false);
		while (poolValueIndex < poolValues.length) {
			yield poolValues[poolValueIndex];
			poolValueIndex++;
			if (poolValueIndex === poolValues.length) poolValueIndex = 0;
		}
		return '';
	};

	const getMappedValue = (row: IRow) => {
		const mappedGenerator = methodParameters as IMappedColumn;
		const foreignTable = mappedGenerator.secondaryTable;
		if (primaryIndex < 0)
			primaryIndex = getColumnIndex(data, mappedGenerator.targetKey);
		if (foreignIndex < 0)
			foreignIndex = getColumnIndex(
				foreignTable,
				mappedGenerator.targetKey
			);

		const localValue = row.contents[primaryIndex].value;
		const remoteRow = getRowWithMatchingValueInColumn(
			foreignTable,
			foreignIndex,
			localValue
		);

		if (remoteRow) return remoteRow.contents[foreignIndex].value;
		return '';
	};

	const generateCellValue = (row: IRow): string => {
		if (method === EGeneratorTypes.blank) return '';
		if (method === EGeneratorTypes.statically)
			return methodParameters as string;
		if (method === EGeneratorTypes.pool) return poolValues.next().value;
		return getMappedValue(row);
	};

	const newData = _.cloneDeep(data);
	const poolValues = poolValuesGenerator();
	let foreignIndex = -1;
	let primaryIndex = -1;

	newData.contents.forEach(addCellToRow);
	return newData;
}
