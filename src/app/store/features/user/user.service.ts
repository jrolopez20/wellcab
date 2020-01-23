import {Injectable} from '@angular/core';
import {props, Store} from '@ngrx/store';
import * as UserActions from './user.actions';
import {Role, User} from '@app/store/models/user.model';
import {Observable} from 'rxjs';
import * as UserSelectors from './user.selectors';
import {AppState} from '@app/reducers';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private store: Store<AppState>) {
    }

    /**
     * Load users
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    public loadUsers({sort, order, page, filter}) {
        this.store.dispatch(UserActions.loadUsersRequest({sort, order, page, filter}));
    }

    public getUsersList$(): Observable<User[]> {
        return this.store.select(UserSelectors.getUsersList);
    }

    public getUsersTotal$(): Observable<number> {
        return this.store.select(UserSelectors.getUsersTotal);
    }

    public getIsLoading$(): Observable<boolean> {
        return this.store.select(UserSelectors.getIsLoading);
    }

    public getError$(): Observable<boolean> {
        return this.store.select(UserSelectors.getError);
    }

    public getRolesAvailable(): Role[] {
        const roles: Role[] = [Role.ADMIN, Role.MANAGER, Role.DRIVER, Role.SHAREDACCOUNT, Role.OWNER];
        return roles;
    }

    public addUser(user: User) {
        this.store.dispatch(
            UserActions.addUserRequest({
                user: {...user}
            })
        );
    }

    public setUser(user: User) {
        this.store.dispatch(
            UserActions.setUserRequest({
                user: {...user}
            })
        );
    }

    public deleteUser(user: User) {
        this.store.dispatch(
            UserActions.deleteUserRequest({
                user: {...user}
            })
        );
    }
}
