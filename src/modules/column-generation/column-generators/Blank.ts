import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Blank: GenerateColumnStrategy<never> = {
	generate: () => {
		return "";
	},
};
