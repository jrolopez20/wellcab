import {Lang} from '../../admin/user/models/user.model';

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
