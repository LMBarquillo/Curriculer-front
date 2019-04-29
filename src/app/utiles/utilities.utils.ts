import {USERDATA} from './constants.interface';

export class Utilities {
  public static compare(a: number, b: number, invert?: boolean): number {
    return invert ? a < b ? 1 : a > b ? -1 : 0 : a > b ? 1 : a < b ? -1 : 0;
  }

  public static getUser(): string {
    return localStorage.getItem(USERDATA).split("|")[0];
  }
}
