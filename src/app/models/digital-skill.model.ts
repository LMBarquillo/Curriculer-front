import {SkillGradeModel} from './skill-grade.model';

export interface DigitalSkillModel {
  processing: SkillGradeModel;
  communication: SkillGradeModel;
  contents: SkillGradeModel;
  safety: SkillGradeModel;
  solving: SkillGradeModel;
}
