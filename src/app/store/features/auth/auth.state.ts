import {User} from '@app/store/models/user.model';

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: any;
}

export const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null
};
