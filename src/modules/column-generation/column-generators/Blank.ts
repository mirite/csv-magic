import GenerateColumnStrategy from "./GenerateColumnStrategy";

export class Blank extends GenerateColumnStrategy {
  getValue(): string {
    return "";
  }
}
