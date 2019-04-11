import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {StarterViewComponent} from './starterview/starterview.component';
import {LoginComponent} from './login/login.component';

import {PeityModule} from '../components/charts/peity';
import {SparklineModule} from '../components/charts/sparkline';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {AuthHttpService} from '../services/auth-http.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    RegisterComponent
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
    LoginService
  ]
})

export class AppviewsModule {
}
