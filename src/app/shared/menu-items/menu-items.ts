import {Injectable} from '@angular/core';

export interface MenuItem {
    id: string;
    name: string;
    summary?: string;
    state?: string;
    type?: string;
}

export interface MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];
    summary?: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    DRIVER = 'DRIVER',
    GESTOR = 'GESTOR',
}

export const Roles: Role[] = [
    Role.ADMIN, Role.DRIVER, Role.GESTOR
];

const MENU: { [key: string]: MenuCategory[] } = {
    [Role.ADMIN]: [
        {
            id: 'admin',
            name: 'Administrar',
            summary: 'Módulo de administración.',
            items: [
                {
                    id: 'users',
                    name: 'Usuarios',
                    summary: 'Gestión de usuarios.',
                    state: 'a',
                    type: 'link'
                },
                {
                    id: 'companies',
                    name: 'Empresas',
                    summary: 'Gestión de usuarios.',
                    state: 'a',
                    type: 'link'
                },
                {
                    id: 'lorem',
                    name: 'Lorem Ipsum',
                    summary: 'Gestión de usuarios.',
                    state: 'a',
                    type: 'folder'
                }
            ]
        },
        {
            id: 'other',
            name: 'Other module',
            summary: 'Módulo de administración.',
            items: [
                {
                    id: 'menu-example',
                    name: 'Menu example',
                    summary: 'Menu example for testing only.',
                    state: 'a',
                    type: 'link'
                }
            ]
        }
    ]
};


@Injectable()
export class MenuItems {
    getCategories(section: string): MenuCategory[] {
        return MENU[section];
    }

    // getItems(section: string): DocItem[] {
    //     if (section === COMPONENTS) {
    //         return ALL_COMPONENTS;
    //     }
    //     if (section === CDK) {
    //         return ALL_CDK;
    //     }
    //     return [];
    // }

    // getItemById(id: string, section: string): DocItem | undefined {
    //     const sectionLookup = section == 'cdk' ? 'cdk' : 'material';
    //     return ALL_DOCS.find(doc => doc.id === id && doc.packageName == sectionLookup);
    // }

    // getCategoryById(id: string): MenuCategory | undefined {
    //     return ALL_CATEGORIES.find(c => c.id == id);
    // }
}
