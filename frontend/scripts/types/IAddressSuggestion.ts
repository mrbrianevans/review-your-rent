export interface IAddressSuggestion{
    address: string,
    id: string,
    autocompleteSessionToken: google.maps.places.AutocompleteSessionToken,
    "distance-from-uni"?: number
}
