import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as UserActions from './user.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {User} from '@app/store/models/user.model';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsersRequest),
            concatMap(({sort, order, page, limit, filter, active, roles}) => {
                return this.http.get<any>
                (`users?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}&active=${active}&roles=${roles.join()}`)
                    .pipe(
                        map(response =>
                            UserActions.loadUsersCompleted({users: response.data, total: response.pagination.total})
                        ),
                        catchError(error =>
                            of(UserActions.usersError({error}))
                        )
                    );
            })
        )
    );

    public addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUserRequest),
            concatMap(({user}) => {
                return this.http.post<User>(`users`, user).pipe(
                    map(response =>
                        UserActions.addUserCompleted({user: {...response}})
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

    public setUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.setUserRequest),
            concatMap(({user}) => {
                const userCopy = {
                    roles: user.roles,
                    hasAccess: user.hasAccess,
                    detail: user.detail
                };
                return this.http.put<User>(`users/${user.id}`, userCopy).pipe(
                    map(response =>
                        UserActions.setUserCompleted({user: {...response}})
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

    public toggleAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.toggleAccessRequest),
            concatMap(({user}) => {
                return this.http.patch<User>(`users/${user.id}`, {
                    accessStatus: user.hasAccess ? 'enabled' : 'disabled'
                }).pipe(
                    map(response =>
                        UserActions.toggleAccessCompleted({user: {...response}})
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

    public toggleUnregister$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.toggleUnregisterRequest),
            concatMap(({user}) => {
                return this.http.patch<User>(`users/${user.id}`, {
                    status: user.unregisteredAt ? 'active' : 'unregistered'
                }).pipe(
                    map(response =>
                        UserActions.toggleUnregisterCompleted({user: {...response}})
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

    public changePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.changePasswordRequest),
            concatMap(({oldPassword, newPassword}) => {
                return this.http.put<any>('user/password', {
                    old: oldPassword,
                    new: newPassword
                }).pipe(
                    map(response =>
                        UserActions.changePasswordCompleted()
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

}
