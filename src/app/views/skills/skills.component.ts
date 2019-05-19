import {Component, OnInit} from '@angular/core';
import {SkillsService} from '../../services/skills.service';
import {Swal} from '../../utiles/swal.utils';
import {Utilities} from '../../utiles/utilities.utils';
import {DigitalSkillModel} from '../../models/digital-skill.model';
import {SkillModel} from '../../models/skill.model';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public digitalSkills: DigitalSkillModel;
  public otherSkills: SkillModel[];

  constructor(private skillsService: SkillsService) {
  }

  ngOnInit() {
    Swal.buildSwallWithoutButtons('Cargando', 'Obteniendo datos. Por favor, espere<br/><i class="fa fa-spinner rotating"></i>', 'info');
    forkJoin(this.skillsService.getDigitalSkills(),
      this.skillsService.getOtherSkills()).subscribe(
      ([digitalSkills, otherSkills]) => {
        this.digitalSkills = digitalSkills;
        this.otherSkills = otherSkills;
        //this.resetFormGroup();
        Swal.close();
      }, err => {
        console.log(err);
        Swal.buildSwalWithoutCancel('Error', Utilities.getErrorDetails(err).error, 'error');
      }
    );
  }

}
