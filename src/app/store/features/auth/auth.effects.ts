import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import * as AuthActions from './auth.actions';
import {Router} from '@angular/router';
import {User} from '@app/store/models/user.model';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {
    }

    public login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginRequest),
            concatMap(({email, password}) => {
                console.log('login effect');
                return this.http.post<any>('users/authenticate', {email, password}).pipe(
                    map(response => {
                        const user: User = {
                            id: response.id,
                            email: response.email,
                            username: response.username,
                            remove_at: response.remove_at,
                            has_access: response.has_access,
                            lang: response.lang,
                        };
                        window.localStorage.setItem('token', JSON.stringify(response.token));
                        // TODO ===== IMPORTANT =====
                        // There is not reason to store the authenticated user in locale storage,
                        // because when the app start need to request to api the data of the authenticated user
                        // THIS IS FOR DEV WITHOUT BACKEND ONLY
                        window.localStorage.setItem('user', JSON.stringify(user));

                        return AuthActions.loginCompleted({user});
                    }),
                    tap(() => this.router.navigate(['/'])),
                    catchError(error => {
                        return of(AuthActions.loginFailed({error}));
                    })
                );
            })
        )
    );

    public logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logoutRequest),
            map(() => (
                window.localStorage.clear(),
                    AuthActions.logoutCompleted()
            )),
            tap(() => this.router.navigateByUrl('/login')),
            /*concatMap(() => {
                return this.http.post<any>('users/logout', {example: 'test'}).pipe(
                    map(response => {
                        window.localStorage.clear();
                        return AuthActions.logoutCompleted();
                    }),
                    tap(() => this.router.navigate(['/login'])),
                    catchError(error => {
                            return of(AuthActions.authError({error}));
                        }
                    )
                );
            })*/
        )
    );

    public updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateProfileRequest),
            concatMap(({user}) => {
                console.log('effect', user);
                return this.http.put<any>(`users/${user.id}`, {user}).pipe(
                    map(() => {
                        console.log('effect back', user);
                        window.localStorage.setItem('user', JSON.stringify(user));
                        return AuthActions.updateProfileCompleted({user});
                    }),
                    catchError(error => {
                        return of(AuthActions.authError({error}));
                    })
                );
            })
        )
    );

}
