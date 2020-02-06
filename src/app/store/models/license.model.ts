export interface License {
    id: number;
    code: string;
    issuesAt: string;
    expirationAt: string;
    removedAt?: string;
    isOperative?: boolean;
}
