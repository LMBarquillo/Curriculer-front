import {Routes} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {BlankLayoutComponent} from './components/common/layouts/blankLayout.component';
import {BasicLayoutComponent} from './components/common/layouts/basicLayout.component';
import {RegisterComponent} from './views/register/register.component';
import {UserhomeComponent} from './views/userhome/userhome.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: BlankLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'home', component: UserhomeComponent}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
