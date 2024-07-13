import type { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Statically: GenerateColumnStrategy<string> = {
  generate: (_row, params) => {
    return params;
  },
};
