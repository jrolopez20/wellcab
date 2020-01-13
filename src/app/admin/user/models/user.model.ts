export enum Lang { en = 'en', es = 'es'}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    lang: Lang;
}

export interface Users {
    items: User[];
    total: number;
}
