import {SkillGradeModel} from './skill-grade.model';
import {LanguageModel} from './language.model';

export interface LanguageSkillModel {
  id: number;
  language: LanguageModel;
  listening: SkillGradeModel;
  reading: SkillGradeModel;
  interaction: SkillGradeModel;
  production: SkillGradeModel;
  writing: SkillGradeModel;
}
