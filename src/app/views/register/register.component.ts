import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private validateForms: boolean = false;
  public registerForm: FormGroup;
  public passForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passForm = this.formBuilder.group({
      pass: new FormControl("", Validators.required),
      passverify: new FormControl("", Validators.required)
    },{
      validator: this.passwordVerifier.bind(this)
    });
    this.registerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      email: new FormControl("", this.checkMail),
      user: new FormControl("", Validators.required),
      pass: this.passForm,
      terms: new FormControl(false, Validators.requiredTrue)
    });
  }

  public doRegister(): void {
    this.validateForms = true;
    if(this.registerForm.valid) {
      console.log("ok");
    }
  }

  public emptyFields(): boolean {
    return !this.registerForm.controls['name'].valid ||
      !this.registerForm.controls['surname'].valid ||
      this.registerForm.controls['email'].value.length == 0 ||
      !this.registerForm.controls['user'].valid ||
      !this.passForm.controls['pass'].valid;
  }

  private passwordVerifier(form: FormGroup) {
    let pass = form.controls['pass'].value;
    let verify = form.controls['passverify'].value;

    if (verify.length <= 0) return null;
    if (verify !== pass) return { notMatch: true };
    return null;
  }

  private checkMail(control: FormControl) {
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
