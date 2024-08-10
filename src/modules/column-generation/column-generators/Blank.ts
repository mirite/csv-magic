import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Blank: GenerateColumnStrategy<undefined> = {
	generate: () => {
		return "";
	},
};
