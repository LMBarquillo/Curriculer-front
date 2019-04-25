import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PeityModule} from '../components/charts/peity';
import {SparklineModule} from '../components/charts/sparkline';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {AuthHttpService} from '../services/auth-http.service';
import {HttpClientModule} from '@angular/common/http';
import {UserhomeComponent} from './userhome/userhome.component';
import {UserService} from '../services/user.service';
import {TrainingsService} from '../services/trainings.service';
import {JobService} from '../services/job.service';

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
    HttpClientModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [
    AuthHttpService,
    LoginService,
    UserService,
    TrainingsService,
    JobService
  ]
})

export class AppviewsModule {
}
