import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '@app/store/features/auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import {getIsLoggedIn} from '@app/store/features/auth/auth.selectors';
import {json} from '@angular-devkit/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    getUser(): Observable<any> {
        return this.authService.getIsLoggedIn$();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.getIsLoggedIn$().pipe(
            take(1),
            switchMap((isLoggedIn) => {
                if (isLoggedIn) {
                    return of(true);
                }
                
                // Not logged in so redirect to login page
                this.router.navigate(['/login']);
                return of(false);
            }),
            catchError(() => {
                this.router.navigateByUrl('/login');
                return of(false);
            })
        );
    }

}
