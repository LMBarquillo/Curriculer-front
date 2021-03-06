import {Component} from '@angular/core';
import {smoothlyMenu} from '../../../app.helpers';
import {Router} from '@angular/router';
import {USERDATA} from '../../../utiles/constants.interface';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopNavbarComponent {

  constructor(private router: Router) {}

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  public logout() {
    localStorage.removeItem(USERDATA);
    this.router.navigate(['']);
  }
}
