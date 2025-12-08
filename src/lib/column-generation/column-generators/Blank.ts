import type { GenerateColumnStrategy } from "./GenerateColumnStrategy.js";

export const Blank: GenerateColumnStrategy<undefined> = {
	generate: () => {
		return "";
	},
};
