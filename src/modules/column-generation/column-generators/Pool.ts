import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

let generator: ReturnType<typeof poolValuesGenerator>;

export const Pool: GenerateColumnStrategy<string[]> = {
	generate: () => {
		return generator.next().value;
	},
	init: (poolValues: string[]) => {
		generator = poolValuesGenerator(poolValues);
	},
};

/**
 * Generator to evenly assign values from the pool of strings provided. Starts
 * at a random index and loops from there.
 *
 * @param poolValues The pool of strings to cycle through.
 * @yields The next string in the pool.
 * @returns The next string in the pool.
 */
function* poolValuesGenerator(poolValues: string[]) {
	/** The current index within the pool values that are being cycled through. */
	let poolValueIndex = Math.floor(Math.random() * poolValues.length);
	while (poolValueIndex < poolValues.length) {
		yield poolValues[poolValueIndex];
		poolValueIndex++;
		if (poolValueIndex === poolValues.length) {
			poolValueIndex = 0;
		}
	}
	return "";
}
