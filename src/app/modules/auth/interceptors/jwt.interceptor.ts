import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@environments/environment';
import {AuthService} from '@app/store/features/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if it's not a language request
        if (!request.url.startsWith('assets/i18n/')) {
            // Add Authentication Header with jwt  if available
            // const currentUser = this.authService.currentUserValue;
            const token = JSON.parse(window.localStorage.getItem('token'));

            request = request.clone({
                url: `${environment.apiUrl + request.url}`,
                setHeaders: (token) ? {
                    Authorization: `Bearer ${token}`
                } : {}
            });
        }

        return next.handle(request);
    }
}
