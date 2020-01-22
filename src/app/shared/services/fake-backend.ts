/**
 * This file  is for test only
 */
import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Lang, User} from '@app/store/models/user.model';
import {Company} from '@app/store/models/company.model';
import {City} from '@app/store/models/city.model';


const users: User[] = [
    {id: 1, email: 'oscar@gmail.com', username: 'oscar', remove_at: '2020-5-20 12:00:00', has_access: 0, lang: Lang.es},
];

const companies: Company[] = [
    {id: 1, name: 'Asus'},
    {id: 2, name: 'Google'}
];

const cities: City[] = [
    {id: 1, name: 'Madrid'},
    {id: 234567890123, name: 'Barcelona'}
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
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
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
