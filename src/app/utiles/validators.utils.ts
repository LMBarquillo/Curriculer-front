import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators {
  public static passwordVerifier(form: FormGroup) {
    let pass = form.controls['pass'].value;
    let verify = form.controls['passverify'].value;

    if (verify.length <= 0) return null;
    if (verify !== pass) return { notMatch: true };
    return null;
  }

  public static isValidEmail(control: FormControl) {
    let result = null;
    let regex: RegExp = RegExp('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$');
    if (!regex.test(control.value)) {
      result = { mailValid: false };
    }
    if (control.value == "" || control.value == null) {
      result = null;
    }
    return result;
  }

  public static isValidDate(control: FormControl) {
    console.log(control.value);
    return moment(control.value, 'DD/MM/YYYY').isValid() ? null : { dateValid: false};
  }

  public static isValidDateOrEmpty(control: FormControl) {
    return moment(control.value, 'DD/MM/YYYY').isValid() || control.value == '' ? null : { dateValid: false};
  }

  public static isValidDateOrNull(control: FormControl) {
    return moment(control.value, 'DD/MM/YYYY').isValid() || control.value == null ? null : { dateValid: false};
  }

  public static isIntegerNumber(formControl: FormControl) {
    return new RegExp('^\\d+$').test(formControl.value)
      ? null
      : {'invalidNumber': {value: formControl.value}};
  }

  public static isDecimalNumber(formControl: FormControl) {
    return new RegExp(/^\d+([\\.,]\d+)?$/).test(formControl.value)
      ? null
      : {'invalidNumber': {value: formControl.value}};
  }

  public static isValidYear(formControl: FormControl) {
    return new RegExp('^\\d{4}$').test(formControl.value) && parseInt(formControl.value) >= 1900 && parseInt(formControl.value) <= new Date().getFullYear()
      ? null
      : {'invalidNumber': {value: formControl.value}};
  }
}
