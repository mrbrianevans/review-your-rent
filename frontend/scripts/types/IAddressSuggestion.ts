export interface IAddressSuggestion{
    address: string,
    secondaryAddress: string,
    id: string,
    autocompleteSessionToken: google.maps.places.AutocompleteSessionToken,
    "distance-from-uni"?: number
}
