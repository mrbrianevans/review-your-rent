export interface IAddress {
    place_id: string;
    primary_address: string;
    secondary_address: string;
    distance_from_uni: number;
    terms: {
        street_number?: number;
        street?: string;
        town?: string;
        post_code?: string;
        county?: string;
        region?: string;
        country?: string;
    }
}
