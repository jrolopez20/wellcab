import {Contract} from '@app/store/models/contract.model';

export interface License {
    id?: number;
    code: string;
    issuesAt: string;
    expirationAt: string;
    removedAt?: string;
    isOperative?: boolean;
    contract?: Contract;
}
