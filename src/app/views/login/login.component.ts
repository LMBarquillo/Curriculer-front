import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserBasicModel} from '../../models/user-basic.model';
import {USERDATA} from '../../utiles/constants.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private validateForms: boolean = false;
  private badLogin: boolean = false;
  private loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem(USERDATA)) {
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup(
      {
        user: new FormControl("", Validators.required),
        pass: new FormControl("", Validators.required)
      }
    );
  }

  public doLogin() {
    this.validateForms = true;
    if(this.loginForm.valid) {
      let user: string = this.loginForm.controls['user'].value;
      let pass: string = this.loginForm.controls['pass'].value;
      this.loginService.login(user, pass).subscribe(
        (ok: UserBasicModel) => {
          localStorage.setItem(USERDATA, ok.user + '|' + ok.token);
          this.router.navigate(['/home']);
        }, () => {
          this.badLogin = true;
        }
      );
    }
  }
}
