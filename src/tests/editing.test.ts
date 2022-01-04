import { getColumnNames } from 'modules/access-helpers';
import { renameColumn } from 'modules/editing';
import testTable from './testTable';

test('Rename columns', () => {
	const newTable = renameColumn(
		testTable,
		'911fd1c0-516d-44b0-b8fd-abeaf5344648',
		'blah'
	);
	const columnNames = getColumnNames(newTable);
	expect(columnNames[1]).toBe('blah');
});
