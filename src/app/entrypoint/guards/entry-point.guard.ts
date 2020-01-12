import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EntryPointService} from '../services/entry-point.service';

@Injectable({
    providedIn: 'root'
})
export class EntryPointGuard implements CanActivate {
    constructor(
        private router: Router,
        private entryPointService: EntryPointService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // // const currentUser = this.entryPointService.currentUserValue;
        // if (currentUser) {
        //     // Authorised so return true
        //     return true;
        // }
        //
        // // Not access so redirect to entry point page
        // this.router.navigate(['entrypoint']);
        // return false;
        return true;
    }

}
