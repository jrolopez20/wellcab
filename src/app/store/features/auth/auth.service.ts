import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from '@app/store/models/user.model';
import {AppState} from '@app/reducers';
import {Observable} from 'rxjs';
import * as AuthActions from '@app/store/features/auth/auth.actions';
import * as AuthSelectors from '@app/store/features/auth/auth.selectors';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private store: Store<AppState>, private router: Router) {
    }

    /**
     * Login into the app
     * @param email
     * @param password
     */
    public login(email: string, password: string): void {
        this.store.dispatch(AuthActions.loginRequest({email, password}));
    }

    /**
     * Logout from the app
     */
    public logout(): void {
        this.store.dispatch(AuthActions.logoutRequest());
    }

    /**
     * Update profile user
     * @param user
     */
    public updateProfile(user: User): void {
        this.store.dispatch(AuthActions.updateProfileRequest({user}));
    }

    /**
     * This service verifiy if there is an user already logged in but it is not stored on the state managment
     * and therefor store it.
     */
    public checkIfLoggedIn(): void {
        const token = JSON.parse(window.localStorage.getItem('token'));
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (token && user) {
            this.store.dispatch(AuthActions.loginCompleted({user}));
            this.router.navigate(['/']);
        }
    }

    /**
     * Get the authenticated user
     */
    public getAuthenticatedUser$(): Observable<User> {
        return this.store.select(AuthSelectors.getUser);
    }

    /**
     * Get if a request is in progress
     */
    public getIsLoading$(): Observable<boolean> {
        return this.store.select(AuthSelectors.getIsLoading);
    }

    /**
     * Get if there is a logged in user
     */
    public getIsLoggedIn$(): Observable<boolean> {
        return this.store.select(AuthSelectors.getIsLoggedIn);
    }

    /**
     * Get the user error
     */
    public getError$(): Observable<any> {
        return this.store.select(AuthSelectors.getError);
    }

}
