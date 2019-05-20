import {AfterViewInit, Component} from '@angular/core';
import {GlobalModel} from '../../models/global.model';
import {CurriculumService} from '../../services/curriculum.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements AfterViewInit {
  public curriculum: GlobalModel;

  constructor(private curriculumService: CurriculumService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['user']) {
        this.loadCurriculum(params['user']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private loadCurriculum(user: string): void {
    Swal.buildSwallWithoutButtons('Cargando', 'Leyendo información del curriculum. Por favor, espere.<br/><i class="fa fa-spinner rotating"></i>', 'info');
    this.curriculumService.getCurriculum(user).subscribe(
      ok => {
        this.curriculum = ok;
        Swal.close();
      }, err => {
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }
}
