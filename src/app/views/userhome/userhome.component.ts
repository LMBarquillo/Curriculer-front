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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.userService.getUserData().subscribe(
      (user: UserModel) => {
        this.userData = user;
        Swal.close();
      }, () => {
        Swal.buildSwalWithoutCancel('Error', 'No se pudo obtener los datos del usuario.', 'error');
      }
    );
  }

  public openFileLoader(): void {
    let fileloader = document.getElementById('fileloader');
    fileloader.click();
  }

  public loadImage(event): void {
    let imageType = /image.*/;
    let file = event.target.files[0];

    if (file.type.match(imageType)) {
      Swal.buildSwallWithoutButtons('Cargando', 'Actualizando avatar. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if(reader.result.length <= 1000000) {
          this.userService.updateAvatar(reader.result).subscribe(
            () => {
              this.userData.picture = reader.result;
              Swal.close();
            }, (err) => {
              console.log(err);
              Swal.buildSwalWithoutCancel('Error', 'No se pudo actualizar el avatar del usuario.', 'error');
            }
          );
        } else {
          Swal.buildSwalWithoutCancel('Imagen demasiado grande','Por favor, escoja otra imagen más pequeña','error');
        }
      }
    } else {
      Swal.buildSwalWithoutCancel('Archivo incorrecto', 'Por favor, seleccione solo archivos de imagen', 'error');
    }
  }

}
