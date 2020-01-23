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
            concatMap(({sort, order, page, filter}) => {
                return this.http.get<any>(`users?filter=${filter}&sort=${sort}&order=${order}&page=${page}`).pipe(
                    map(response =>
                        UserActions.loadUsersCompleted({users: response.items, total: response.total})
                    ),
                    catchError(error =>
                        of(UserActions.usersError(error))
                    )
                );
            })
        )
    );

    public deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUserRequest),
            concatMap(({user}) => {
                return this.http.delete<any>(`users/${user.id}`).pipe(
                    map(response =>
                        UserActions.deleteUserCompleted({user})
                    ),
                    catchError(error => {
                        return of(UserActions.usersError(error));
                    })
                );
            })
        )
    );

    public setUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.setUserRequest),
            concatMap(({user}) => {
                return this.http.put<any>(`users/${user.id}`, {user}).pipe(
                    map(response =>
                        UserActions.setUserCompleted({user})
                    ),
                    catchError(error => {
                        return of(UserActions.usersError(error));
                    })
                );
            })
        )
    );

}
