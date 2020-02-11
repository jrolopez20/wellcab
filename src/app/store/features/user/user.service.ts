import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
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
     * @param limit
     * @param filter
     * @param active
     * @param roles
     */
    public loadUsers({sort = '', order, page, limit, filter = '', active = null, roles = []}) {
        this.store.dispatch(UserActions.loadUsersRequest({sort, order, page, limit, filter, active, roles}));
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
        const roles: Role[] = [Role.ADMIN, Role.MANAGER, Role.DRIVER, Role.OWNER];
        return roles;
    }

    public addUser(user: User) {
        this.store.dispatch(UserActions.addUserRequest({user}));
    }

    public setUser(user: User) {
        this.store.dispatch(UserActions.setUserRequest({user}));
    }

    public toggleAccess(user: User) {
        this.store.dispatch(UserActions.toggleAccessRequest({user}));
    }

    public toggleUnregister(user: User) {
        this.store.dispatch(UserActions.toggleUnregisterRequest({user}));
    }

    /**
     * Change authenticated user password
     * @param oldPassword
     * @param newPassword
     */
    public changePassword(oldPassword: string, newPassword: string) {
        this.store.dispatch(UserActions.changePasswordRequest({oldPassword, newPassword}));
    }

    public resetStorage() {
        this.store.dispatch(UserActions.resetStorage());
    }

}
