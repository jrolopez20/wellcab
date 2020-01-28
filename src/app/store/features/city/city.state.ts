import {City} from '@app/store/models/city.model';

export interface CityState {
    cities: City[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: CityState = {
    cities: null,
    total: 0,
    loading: false,
    error: null
};
