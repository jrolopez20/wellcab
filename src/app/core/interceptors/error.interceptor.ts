import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@app/store/features/auth/auth.service';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private notifierService: NotifierService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(e => {
            if (e.status === 401) {
                // Auto logout if 401 response returned from api
                this.authService.logout();
                // location.reload(true);
            }

            const error = e.error.message || e.statusText;
            this.notifierService.notify('error', error);
            // this.notifierService.notify('error', error);
            if (e.error.errors) {
                e.error.errors.map(err => {
                    this.notifierService.notify('error', err.message);
                });
            }

            return throwError(error);
        }));
    }
}
