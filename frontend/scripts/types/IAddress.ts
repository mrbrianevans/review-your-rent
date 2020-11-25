export interface IAddress {
    'street-address': string,
    'secondary-address': string,
    'place-id': string,
    'terms': { [key: number]: string },
    'post-code'?: string,
    'distance-from-uni'?: number
}
