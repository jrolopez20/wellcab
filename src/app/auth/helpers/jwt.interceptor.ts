import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if it's not a language request
        if (!request.url.startsWith('assets/i18n/')) {
            // Add Authentication Header with jwt  if available
            const currentUser = this.authenticationService.currentUserValue;

            request = request.clone({
                url: `${environment.apiUrl + request.url}`,
                setHeaders: (currentUser && currentUser.token) ? {
                    Authorization: `Bearer ${currentUser.token}`
                } : {}
            });
        }

        return next.handle(request);
    }
}
