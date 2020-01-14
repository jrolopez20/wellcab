import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cities, City} from '../models/city.model';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
    }

    /**
     * Retrieve a collection of cities
     * @param sort
     * @param order
     * @param page
     * @param filter
     */
    getCollection(sort: string, order: string, page: number, filter?: string): Observable<Cities> {
        // const requestUrl = `companies?filter=${filter}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<Cities>('cities');
    }

    /**
     * Find city by ID
     * @param id
     */
    findById(id: number) {
        return this.http.get(`cities/${id}`);
    }

    add(data: City) {
        return this.http.post<any>(`cities`, data);
    }

    update(id: number, data) {
        return this.http.put(`cities/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete(`cities/${id}`);
    }

}
