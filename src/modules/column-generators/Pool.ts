import _ from 'lodash';
import GenerateColumnStrategy, {
	StrategyParameters,
} from './GenerateColumnStrategy';
import { IRow } from '../../types';

export class Pool extends GenerateColumnStrategy {
	private generator: Generator<string, string, unknown>;

	constructor(protected methodParameters: StrategyParameters) {
		super(methodParameters);
		this.generator = this.poolValuesGenerator();
	}

	/**
	 * Generator to evenly assign values from the pool of strings provided.
	 * Starts at a random index and loops from there.
	 *
	 * @return The next string in the pool.
	 */
	*poolValuesGenerator() {
		/**
		 * The list of strings that can be assigned from.
		 */
		const poolValues = this.methodParameters as Array<string>;

		/**
		 * The current index within the pool values that are being cycled through.
		 */
		let poolValueIndex = _.random(0, poolValues.length - 1, false);
		while (poolValueIndex < poolValues.length) {
			yield poolValues[poolValueIndex];
			poolValueIndex++;
			if (poolValueIndex === poolValues.length) {
				poolValueIndex = 0;
			}
		}
		return '';
	}

	getValue(row: IRow | undefined): string {
		return this.generator.next().value;
	}
}
