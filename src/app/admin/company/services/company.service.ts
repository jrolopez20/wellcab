import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Companies} from '../models/company.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient) {
    }

    /**
     * Retrieve a collection of companies
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    getCollection(sort: string, order: string, page: number, filter?: string): Observable<Companies> {
        // const requestUrl = `companies?filter=${filter}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<Companies>('companies');
    }

    /**
     * Find company by ID
     * @param id
     */
    findById(id: number) {
        return this.http.get(`companies/${id}`);
    }

    add(data) {
        return this.http.post<any>(`companies`, data);
    }

    update(id, data) {
        return this.http.put(`companies/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`companies/${id}`);
    }
}
