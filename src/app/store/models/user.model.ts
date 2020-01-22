export enum Lang { en = 'en', es = 'es'}

export interface UserDriverDetail {
    socialSecurityNumber: string;
}

export interface UserDetail {
    name: string;
    lastName: string;
    identificationDocument: string;
    documentType: number;
    address: string;
    mainContactPhone: string;
    secondaryContactPhone: string;
    bankAccountNumber: string;
    driver?: UserDriverDetail;
}

export interface User {
    id: number;
    email: string;
    username: string;
    remove_at: any;
    has_access: number;
    detail?: UserDetail;
    lang?: Lang;
}
