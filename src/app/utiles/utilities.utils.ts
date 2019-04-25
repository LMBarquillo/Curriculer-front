export class Utilities {
  public static compare(a: number, b: number, invert?: boolean): number {
    return invert ? a < b ? 1 : a > b ? -1 : 0 : a > b ? 1 : a < b ? -1 : 0;
  }
}
