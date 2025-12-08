import type { GenerateColumnStrategy } from "./GenerateColumnStrategy.js";

export const Statically: GenerateColumnStrategy<string> = {
	generate: (_row, params) => {
		return params;
	},
};
