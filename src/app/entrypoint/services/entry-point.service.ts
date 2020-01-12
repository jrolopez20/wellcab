import {Injectable} from '@angular/core';
import {EntryPoint} from '../models/entry-point.model';

@Injectable({
    providedIn: 'root'
})
export class EntryPointService {

    constructor() {
    }

    /**
     * Return all entry point that user has access
     */
    public getCollection(user): EntryPoint[] {
        return [
            {id: 1, name: 'Madrid'},
            {id: 2, name: 'Barcelona'}
        ];
    }
}
