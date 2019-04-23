import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {CustomValidators} from '../../utiles/validators.utils';
import {RegisterModel} from '../../models/register.model';
import {LoginService} from '../../services/login.service';
import {USERDATA} from '../../utiles/constants.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private validateForms: boolean = false;
  public registerError: string = "";
  public registerForm: FormGroup;
  public passForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem(USERDATA)) {
      this.router.navigate(['/home']);
    }

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
    this.registerError = "";
    this.validateForms = true;
    if(this.registerForm.valid) {
      this.loginService.register(this.getFormData()).subscribe(
        ok => {
          localStorage.setItem(USERDATA, ok.user + '|' + ok.token);
          this.router.navigate(['/home']);
        }, err => {
          this.validateForms = false;
          this.registerError = err.error.error;
        }
      );
    }
  }

  public getFormData(): RegisterModel {
    return {
      name: this.registerForm.controls['name'].value,
      surname: this.registerForm.controls['surname'].value,
      email: this.registerForm.controls['email'].value,
      user: this.registerForm.controls['user'].value,
      password: this.passForm.controls['pass'].value
    };
  }

  public emptyFields(): boolean {
    return !this.registerForm.controls['name'].valid ||
      !this.registerForm.controls['surname'].valid ||
      this.registerForm.controls['email'].value.length == 0 ||
      !this.registerForm.controls['user'].valid ||
      !this.passForm.controls['pass'].valid;
  }
}
