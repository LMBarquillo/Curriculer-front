import {zeroFill} from 'ngx-bootstrap/bs-moment/utils';

export class Formats {
  public static formatDate(utc: string): string {
    if(utc == null) return "";

    let date = new Date(utc);
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
