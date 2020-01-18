import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, Lang, Users} from '../../../store/models/user.model';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }

    /**
     * Retrieve a collection of users
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    getCollection(sort: string, order: string, page: number, filter?: string): Observable<Users> {
        // const requestUrl = `users?filter=${filter}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<Users>('users');
    }

    /**
     * Find user by ID
     * @param id
     */
    findById(id: number) {
        return this.http.get(`users/${id}`);
    }

    add(data: User) {
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
