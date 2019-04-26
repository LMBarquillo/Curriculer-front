import {environment} from '../../environments/environment';

const API: string = environment.api;

// Uso general
export const USERDATA: string = 'CurriculerUserData';

// EndPoints
export const EP_LOGIN: string = API + '/login';
export const EP_USER: string = API + '/user';
export const EP_AVATAR: string = API + '/user/avatar';
export const EP_TRAININGS: string = API + '/training';
export const EP_JOBS: string = API + '/job';
export const EP_LANGUAGES: string = API + '/language';
