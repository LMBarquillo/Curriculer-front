import {SkillGradeModel} from './skill-grade.model';

export interface LanguageModel {
  id: number;
  language: string;
  code: string;
  listening: SkillGradeModel;
  reading: SkillGradeModel;
  interaction: SkillGradeModel;
  production: SkillGradeModel;
  writing: SkillGradeModel;
}
