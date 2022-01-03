import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
};
export default config;
