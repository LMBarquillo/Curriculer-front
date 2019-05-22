import {Component, OnInit} from '@angular/core';
import {detectBody} from '../../../app.helpers';
import {USERDATA} from '../../../utiles/constants.interface';
import {Router} from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  public onResize(){
    detectBody();
  }

  ngOnInit(): void {
    detectBody();
    this.checkUser();
  }

  private checkUser() {
    if(localStorage.getItem(USERDATA) == null) {
      this.router.navigate(['']);
    }
  }
}
