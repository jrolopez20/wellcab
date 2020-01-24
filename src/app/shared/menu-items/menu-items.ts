import {Injectable} from '@angular/core';
import {Role} from '@app/store/models/user.model';

export interface MenuItem {
    id: string;
    name: string;
    summary?: string;
}

export interface MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];
    summary?: string;
}

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
                    summary: 'Gestión de usuarios.'
                },
                {
                    id: 'companies',
                    name: 'Empresas',
                    summary: 'Gestión de usuarios.'
                },
                {
                    id: 'cities',
                    name: 'Ciudades',
                    summary: 'Gestión de ciudades.'
                },
                {
                    id: 'licenses',
                    name: 'Licencias',
                    summary: 'Gestión de licencias.'
                },
                {
                    id: 'vehicles',
                    name: 'Vehiculos',
                    summary: 'Gestión de vehículos.'
                }
            ]
        },
        /*{
            id: 'other',
            name: 'Other module',
            summary: 'Módulo de administración.',
            items: [
                {
                    id: 'menu-example',
                    name: 'Menu example',
                    summary: 'Menu example for testing only.'
                }
            ]
        }*/
    ]
};


@Injectable()
export class MenuItems {
    getCategories(section: Role): MenuCategory[] {
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
