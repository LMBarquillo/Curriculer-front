import {Routes} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {BlankLayoutComponent} from './components/common/layouts/blankLayout.component';
import {BasicLayoutComponent} from './components/common/layouts/basicLayout.component';
import {RegisterComponent} from './views/register/register.component';
import {UserhomeComponent} from './views/userhome/userhome.component';
import {TrainingComponent} from './views/training/training.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {LanguagesComponent} from './views/languages/languages.component';
import {SkillsComponent} from './views/skills/skills.component';
import {CurriculumComponent} from './views/curriculum/curriculum.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: BlankLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'view', component: CurriculumComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'home', component: UserhomeComponent},
      {path: 'training', component: TrainingComponent},
      {path: 'jobs', component: JobsComponent},
      {path: 'languages', component: LanguagesComponent},
      {path: 'skills', component: SkillsComponent}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
