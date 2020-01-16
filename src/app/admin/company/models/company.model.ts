export interface Company {
    id: number;
    name: string;
}

export interface Companies {
    items: Company[];
    total: number;
}
