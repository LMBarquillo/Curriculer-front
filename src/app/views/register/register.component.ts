import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';

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
      validator: CustomValidators.passwordVerifier.bind(this)
    });
    this.registerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      email: new FormControl("", CustomValidators.checkMail),
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
}
