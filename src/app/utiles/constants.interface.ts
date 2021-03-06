import {environment} from '../../environments/environment';

const API: string = environment.api;

// Uso general
export const USERDATA: string = 'CurriculerUserData';

// EndPoints
export const EP_LOGIN: string = API + '/login';
export const EP_CURRICULUM: string = API + '/curriculum';
export const EP_USER: string = API + '/user';
export const EP_AVATAR: string = API + '/user/avatar';
export const EP_TRAININGS: string = API + '/training';
export const EP_JOBS: string = API + '/job';
export const EP_SECTORS: string = API + '/sector';
export const EP_LANGUAGES: string = API + '/language';
export const EP_LANGUAGE_SKILLS: string = API + '/language/skill';
export const EP_LANGUAGE_GRADES: string = API + '/language/grade';
export const EP_DIGITAL_SKILLS: string = API + '/digitalskill';
export const EP_OTHER_SKILLS: string = API + '/otherskill';
export const EP_SKILL_GRADES: string = API + '/skill/grade';
