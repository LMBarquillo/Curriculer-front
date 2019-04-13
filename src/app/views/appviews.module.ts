import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PeityModule} from '../components/charts/peity';
import {SparklineModule} from '../components/charts/sparkline';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {AuthHttpService} from '../services/auth-http.service';
import {HttpClientModule} from '@angular/common/http';
import {UserhomeComponent} from './userhome/userhome.component';
import {UserService} from '../services/user.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserhomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    AuthHttpService,
    LoginService,
    UserService
  ]
})

export class AppviewsModule {
}
