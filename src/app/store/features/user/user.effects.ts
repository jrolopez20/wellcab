import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as UserActions from './user.actions';
import {catchError, concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private http: HttpClient) {
    }

    public loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsersRequest),
            concatMap(({sort, order, page, limit, filter}) => {
                return this.http.get<any>(`users?search=${filter}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`).pipe(
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
                return this.http.post<any>(`users`, user).pipe(
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
                return this.http.put<any>(`users/${user.id}`, userCopy).pipe(
                    map(response =>
                        UserActions.setUserCompleted({user: {...response}})
                    ),
                    catchError(error => of(UserActions.usersError({error})))
                );
            })
        )
    );

}
