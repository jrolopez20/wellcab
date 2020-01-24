export interface License {
    id: number;
    code: string;
    issuesAt: string;
    expirationAt: string;
    removeAt?: string;
    isOperative?: boolean;
}
