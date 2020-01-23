export enum Lang { en = 'en', es = 'es'}

export enum Role {
    ADMIN = 'ROLE_ADMIN',
    DRIVER = 'ROLE_DRIVER',
    SHAREDACCOUNT = 'ROLE_SHAREDACCOUNT',
    MANAGER = 'ROLE_MANAGER',
    OWNER = 'ROLE_OWNER'
}

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
    roles: any;
    removeAt: any;
    hasAccess: number;
    detail?: UserDetail;
    lang?: Lang;
}
