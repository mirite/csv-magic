import { GenerateColumnStrategy } from "./GenerateColumnStrategy";

export const Statically: GenerateColumnStrategy<string> = {
  generate: (row, params) => {
    return params;
  },
};
