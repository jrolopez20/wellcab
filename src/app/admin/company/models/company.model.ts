export interface Company {
    id: number;
    name: string;
    address: string;
}

export interface Companies {
    items: Company[];
    total: number;
}
