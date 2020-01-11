export enum Lang { en = 'en', es = 'es'}

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    lang: Lang;
    token?: string;
}
