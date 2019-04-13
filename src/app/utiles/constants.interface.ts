import {environment} from '../../environments/environment';

const API: string = environment.api;

// Uso general
export const USERDATA: string = 'CurriculerUserData';

// EndPoints
export const EP_LOGIN: string = API + '/login';
export const EP_USER: string = API + '/user';
