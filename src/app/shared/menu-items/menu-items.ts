import {Injectable} from '@angular/core';
import {Role} from '@app/store/models/user.model';

export interface MenuItem {
    id: string;
    name: string;
    summary?: string;
    icon?: string;
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
            id: 'managment',
            name: 'Administrar',
            summary: 'Módulo de administración',
            items: [
                {
                    id: 'users',
                    name: 'Usuarios',
                    summary: 'Gestión de usuarios del sistema.',
                    icon: 'person'
                },
                {
                    id: 'companies',
                    name: 'Empresas',
                    summary: 'Gestión de empresas.',
                    icon: 'domain'
                },
                {
                    id: 'cities',
                    name: 'Ciudades',
                    summary: 'Gestión de ciudades.',
                    icon: 'location_city'
                },
                {
                    id: 'licenses',
                    name: 'Licencias',
                    summary: 'Gestión de licencias.',
                    icon: 'work'
                },
                {
                    id: 'vehicles',
                    name: 'Vehículos',
                    summary: 'Gestión de vehículos.',
                    icon: 'directions_car'
                },
                {
                    id: 'colors',
                    name: 'Colores',
                    summary: 'Nomenclador de colores.',
                    icon: 'palette'
                },
                {
                    id: 'brands',
                    name: 'Marcas y modelos',
                    summary: 'Gestión de marcas y modelos de los vehículos.'
                }
            ]
        }
        // {
        //     id: 'admin',
        //     name: 'Nomencladores',
        //     summary: 'Nomencladores del sistema.',
        //     items: [
        //         {
        //             id: 'colors',
        //             name: 'Colores',
        //             summary: 'Gestión de colores disponibles.'
        //         }
        //     ]
        // }
    ]
};


@Injectable()
export class MenuItems {
    getCategories(section: Role): MenuCategory[] {
        return MENU[section];
    }

    getCategoriesByRoles(roles: Role[]): MenuCategory[] {

        return [];
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
