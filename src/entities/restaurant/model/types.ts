export interface Location {
    id: string;
    address: string;
    isOpen: boolean;
}

export interface Restaurant {
    id: string;
    name: string;
    locations: Location[];
}
