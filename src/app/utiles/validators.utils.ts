import {FormControl, FormGroup} from '@angular/forms';

export class CustomValidators {
  public static passwordVerifier(form: FormGroup) {
    let pass = form.controls['pass'].value;
    let verify = form.controls['passverify'].value;

    if (verify.length <= 0) return null;
    if (verify !== pass) return { notMatch: true };
    return null;
  }

  public static checkMail(control: FormControl) {
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
}