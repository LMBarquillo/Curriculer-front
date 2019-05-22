import {USERDATA} from './constants.interface';
import {ErrorModel} from '../models/error.model';

export class Utilities {
  public static compareNumber(a: number, b: number, invert?: boolean): number {
    return invert ? a < b ? 1 : a > b ? -1 : 0 : a > b ? 1 : a < b ? -1 : 0;
  }

  public static compareString(a: string, b: string, invert?: boolean): number {
    return invert ? a.localeCompare(b) : b.localeCompare(a);
  }

  public static compareDate(dateA: any, dateB: any, invert?: boolean): number {
    if(dateA == null || dateB == null) {
      return invert ? (dateA == null ? -1 : 1) : (dateB == null ? -1 : 1);
    } else {
      let a: number = new Date(dateA).getTime();
      let b: number = new Date(dateB).getTime();

      return invert ? a < b ? 1 : a > b ? -1 : 0 : a > b ? 1 : a < b ? -1 : 0;
    }
  }

  public static getUser(): string {
    return localStorage.getItem(USERDATA).split("|")[0];
  }

  public static getErrorDetails(body: any): ErrorModel {
    let details = body.error;
    return details ? details : { code: 500, error: "Se produjo un error al realizar la operación"};
  }
}
