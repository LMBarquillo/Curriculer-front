import {zeroFill} from 'ngx-bootstrap/bs-moment/utils';
import * as moment from 'moment';

export class Formats {
  public static dateToForm(utc: string): string {
    if(utc == null) return "";
    return moment(utc).format('MM/DD/YYYY');
  }

  public static formatDate(utc: string): string {
    if(utc == null) return "";
    let date = new Date(utc);
    return zeroFill(date.getDate(), 2) + '/' + zeroFill(date.getMonth() + 1, 2) + '/' + date.getFullYear();
  }

  public static today(): string {
    let date = new Date();
    return zeroFill(date.getDate(), 2) + '/' + zeroFill(date.getMonth() + 1, 2) + '/' + date.getFullYear();
  }

  public static zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + '';
  }
}
