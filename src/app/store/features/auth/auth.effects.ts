import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, tap, switchMap, mergeAll, merge} from 'rxjs/operators';
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
            switchMap(({email, password}) => {
                return this.http.post<any>('auth/login', {username: email, password}).pipe(
                    switchMap(response => {
                            window.localStorage.setItem('token', JSON.stringify(response.token));
                            return [AuthActions.loginCompleted(), AuthActions.getAuthenticatedUserRequest()];
                        }
                    ),
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

    public getAuthenticatedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.getAuthenticatedUserRequest),
            // ofType(AuthActions.getAuthenticatedUserRequest),
            concatMap(() => {
                return this.http.get<any>('user').pipe(
                    map(response => {
                        const user: User = response;
                        window.localStorage.setItem('user', JSON.stringify(user));
                        return AuthActions.getAuthenticatedUserCompleted({user});
                    }),
                    tap(() => this.router.navigate(['/'])),
                    catchError(error => {
                        return of(AuthActions.authError({error}));
                    })
                );
            })
        )
    );

    public updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateProfileRequest),
            concatMap(({user}) => {
                return this.http.put<any>(`users/${user.id}`, {user}).pipe(
                    map(() => {
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
