import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, Lang} from '../models/user.model';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }


    getAll(): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    findById(id: number) {
        return this.http.get(`users/${id}`);
    }

    add(data) {
        console.log('from service');
        return this.http.post<any>(`users`, data);
    }

    update(id, data) {
        return this.http.put(`users/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`users/${id}`);
    }

    updateProfile(language: Lang): void {
        const user = this.authenticationService.currentUserValue;
        user.lang = language;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
