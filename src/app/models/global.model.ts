import {UserModel} from './user.model';
import {TrainingModel} from './training.model';
import {JobModel} from './job.model';
import {LanguageSkillModel} from './language-skill.model';
import {DigitalSkillModel} from './digital-skill.model';
import {SkillModel} from './skill.model';

export interface GlobalModel {
  user: UserModel,
  trainings: TrainingModel[],
  jobs: JobModel[],
  languages: LanguageSkillModel[],
  digitalSkills: DigitalSkillModel,
  otherSkills: SkillModel[]
}
