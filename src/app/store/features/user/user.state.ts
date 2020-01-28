import {User} from '@app/store/models/user.model';

export interface UserState {
    users: User[] | null;
    total: number;
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    users: null,
    total: 0,
    loading: false,
    error: null
};
