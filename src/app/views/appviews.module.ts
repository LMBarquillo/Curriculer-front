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
import {JobsService} from '../services/jobs.service';
import {LanguagesService} from '../services/languages.service';
import {SkillsService} from '../services/skills.service';
import {TrainingComponent} from './training/training.component';
import {JobsComponent} from './jobs/jobs.component';
import {LanguagesComponent} from './languages/languages.component';
import {SkillsComponent} from './skills/skills.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    TrainingComponent,
    JobsComponent,
    LanguagesComponent,
    SkillsComponent
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
    JobsService,
    LanguagesService,
    SkillsService
  ]
})

export class AppviewsModule {
}
