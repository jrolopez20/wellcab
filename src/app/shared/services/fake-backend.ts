/**
 * This file  is for test only
 */
import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Lang, Role, User} from '@app/store/models/user.model';
import {Company} from '@app/store/models/company.model';
import {City} from '@app/store/models/city.model';
import {Vehicle} from '@app/store/models/vehicle.model';

const users: User[] = [
    {
        id: 1, email: 'oscar@gmail.com', username: 'oscar', removeAt: '', hasAccess: 1, lang: Lang.es, roles: [Role.ADMIN],
        detail: {
            name: 'Oscar',
            lastName: 'Wilde',
            identificationDocument: '123456789',
            documentType: 12345,
            address: 'Paseo de la castellana #254, Madrid',
            mainContactPhone: '+34640543270',
            secondaryContactPhone: '',
            bankAccountNumber: ''
        }
    },
    {
        id: 2,
        email: 'pablo@gmail.com',
        username: 'pablo',
        removeAt: '2020-6-20 12:00:00',
        hasAccess: 1,
        lang: Lang.es,
        roles: [Role.ADMIN, Role.DRIVER],
        detail: {
            name: 'Pablo',
            lastName: 'Picasso',
            identificationDocument: '483401482',
            documentType: 12346,
            address: 'Paseo de la castellana #487, Madrid',
            mainContactPhone: '+34640583205',
            secondaryContactPhone: '',
            bankAccountNumber: ''
        }
    }
];

const companies: Company[] = [
    {id: 1, name: 'Asus'},
    {id: 2, name: 'Google'}
];

const cities: City[] = [
    {id: 1, name: 'Madrid'},
    {id: 234567890123, name: 'Barcelona'}
];

const vehicles: Vehicle[] = [
    {
        id: 1,
        name: '478',
        plateNumber: 'AZD7458',
        status: 'OK',
        brand: 'Hundai',
        model: 'Accent',
        color: 'Blanco',
        currentOdometer: 10245,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 100000,
        rentExpirationAt: null,
        removeAt: null
    },
    {
        id: 2,
        name: '798',
        plateNumber: 'CZR1562',
        status: 'OK',
        brand: 'Hundai',
        model: 'Sonata',
        color: 'Negro',
        currentOdometer: 78954,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 98200,
        rentExpirationAt: null,
        removeAt: null
    },
    {
        id: 3,
        name: '6935',
        plateNumber: 'HUR1562',
        status: 'OK',
        brand: 'VolskWagen',
        model: 'Escarabajo',
        color: 'Rojo',
        currentOdometer: 123586,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 250631,
        rentExpirationAt: null,
        removeAt: null
    },
    {
        id: 3,
        name: '45621',
        plateNumber: 'OPR1597',
        status: 'OK',
        brand: 'Peugeot',
        model: '406',
        color: 'Amarillo',
        currentOdometer: 123586,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 250631,
        rentExpirationAt: null,
        removeAt: '5/6/2019'
    },
    {
        id: 4,
        name: '8965',
        plateNumber: 'HVB7894',
        status: 'OK',
        brand: 'Chevrolet',
        model: 'Camaro',
        color: 'Negro',
        currentOdometer: 120,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 10000,
        rentExpirationAt: null,
        removeAt: null
    },
    {
        id: 5,
        name: '8965',
        plateNumber: 'ZCQ9652',
        status: 'OK',
        brand: 'Ford',
        model: 'Mustand',
        color: 'Blanco',
        currentOdometer: 120,
        insuranceExpirationAt: '10/10/2021',
        itvExpirationAt: '8/12/2020',
        matriculationAt: '1/3/2014',
        odometerNextRevision: 10000,
        rentExpirationAt: null,
        removeAt: null
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url, method, headers, body} = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {

            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.substr(url.lastIndexOf('/')).startsWith('/users') && method === 'GET':
                    return getUsers();
                case url.substr(url.lastIndexOf('/')).startsWith('/vehicles') && method === 'GET':
                    return getVehicles();
                case url.substr(url.lastIndexOf('/')).startsWith('/companies') && method === 'GET':
                    return getCompanies();
                case url.substr(url.lastIndexOf('/')).startsWith('/cities') && method === 'GET':
                    return getCities();
                case url.substr(29).indexOf('cities') !== -1 && method === 'DELETE':
                    return deleteCity();
                case url.substr(29).indexOf('users') !== -1 && method === 'PUT':
                    return updateProfile();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // Route functions
        function authenticate() {
            const {email, password} = body;
            const user = users.find(x => x.email === email && 'secret' === password);
            if (!user) {
                return error('Username or password is incorrect');
            }
            return ok({
                ...user,
                token: 'fake-jwt-token'
            });
        }

        function getUsers() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            return ok({
                items: [...users],
                total: users.length,
            });
        }

        function getCompanies() {
            return ok({
                items: [...companies],
                total_count: companies.length,
            });
        }

        function getVehicles() {
            return ok({
                items: [...vehicles],
                total: vehicles.length,
            });
        }

        function getCities() {
            return ok({
                items: [...cities],
                total: cities.length,
            });
        }

        function deleteCity() {
            return ok();
        }

        function updateProfile() {
            const {user} = body;
            return ok({user});
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({status: 200, body}));
        }

        function error(message) {
            return throwError({error: {message}});
        }

        function unauthorized() {
            return throwError({status: 401, error: {message: 'Unauthorised'}});
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
