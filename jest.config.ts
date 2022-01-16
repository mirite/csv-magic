import type { Config } from '@jest/types';
import path from 'path';
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
	moduleDirectories: ['node_modules', path.join(__dirname, './src')],
};
export default config;
