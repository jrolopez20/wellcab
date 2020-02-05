export enum Lang { en = 'en', es = 'es'}

export enum Role {
    ADMIN = 'ROLE_ADMIN',
    DRIVER = 'ROLE_DRIVER',
    SHAREDACCOUNT = 'ROLE_SHAREDACCOUNT',
    MANAGER = 'ROLE_MANAGER',
    OWNER = 'ROLE_OWNER'
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
    socialSecurityNumber: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    roles: Role[];
    hasAccess: number;
    removedAt?: any;
    detail?: UserDetail;
    lang?: Lang;
}
