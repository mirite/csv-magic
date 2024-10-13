/**
 * Clone an object
 *
 * @template T The type of the object
 * @param data The object to clone
 * @returns A clone of the object
 */
export function cloneDeep<T extends object>(data: T): T {
	return structuredClone(data);
}

/**
 * Create a unique ID for a cell
 *
 * @param rowID The row ID
 * @param columnID The column ID
 * @returns A unique cell ID
 */
export function createCellID(rowID: number, columnID: number): string {
	return rowID + "," + columnID;
}

const indices = {
	row: 0,
	column: 0,
	file: 0,
};

/**
 * Create a unique ID
 *
 * @param idType - The type of ID to create
 * @returns A unique ID
 */
export function createID(idType: keyof typeof indices): number {
	return ++indices[idType];
}
