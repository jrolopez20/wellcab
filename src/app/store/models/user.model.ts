export enum Lang { en = 'en', es = 'es'}

export enum Role {
    ADMIN = 'ROLE_ADMIN',
    MANAGER = 'ROLE_MANAGER',
    DRIVER = 'ROLE_DRIVER',
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
    unregisteredAt?: any;
    detail?: UserDetail;
    lang?: Lang;
}
