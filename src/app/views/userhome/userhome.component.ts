import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {Swal} from '../../utiles/swal.utils';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  public userData: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    Swal.buildSwallWithoutButtons('Cargando','Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>',"info");
    this.userService.getUserData().subscribe(
      (user: UserModel) => {
        this.userData = user;
        Swal.close();
      }, () => {
        Swal.buildSwalWithoutCancel('Error','No se pudo obtener los datos del usuario.','error');
      }
    );
  }

}
