import {Lang} from './user.model';

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    lang: Lang;
    token?: string;
}
