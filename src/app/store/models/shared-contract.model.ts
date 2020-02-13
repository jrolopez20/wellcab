import {User} from '@app/store/models/user.model';

export interface SharedContract {
    id?: number;
    ownerUser: User;
    finishedAt?: string;
}
