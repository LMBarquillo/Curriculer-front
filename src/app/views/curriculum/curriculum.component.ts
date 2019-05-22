import {AfterViewInit, Component} from '@angular/core';
import {GlobalModel} from '../../models/global.model';
import {CurriculumService} from '../../services/curriculum.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {Formats} from '../../utiles/formats.utils';
import {ErrorModel} from '../../models/error.model';

const NOT_FOUND: number = 404;

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements AfterViewInit {
  public curriculum: GlobalModel;
  public notFound: boolean = false;

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
        let details: ErrorModel = Utilities.getErrorDetails(err);
        console.log(details);
        if (details.code == NOT_FOUND) {
          Swal.close();
          this.notFound = true;
        } else {
          Swal.buildSwalWithoutCancel('Error', details.error, 'error');
        }
      }
    );
  }

  public getDate(date: string): string {
    return Formats.formatDate(date);
  }
}
