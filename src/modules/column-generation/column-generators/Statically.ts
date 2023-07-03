import GenerateColumnStrategy from "./GenerateColumnStrategy";

export class Statically extends GenerateColumnStrategy {
  getValue(): string {
    return this.methodParameters as string;
  }
}
