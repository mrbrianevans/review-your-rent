import * as ReactDOM from "react-dom";
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {DisplaySuggestions} from "./DisplaySuggestions";

declare global{
    interface Window {
        addAutocompleteEventListenerToSearchBox: ()=>void
    }
}

// this is called when the Google Maps API has been loaded
// it attaches an event listener to the search box to respond to queries
// as the processing of these queries requires Google Maps, it waits for Google's JS to load in
export const addAutocompleteEventListenerToSearchBox: ()=>void = () => {
    console.log("Called the callback function start in "+window.location)
    if(document.querySelector('input[type=text].search-box')===null) return
    const getAddressSuggestions: (changeEvent: Event) => void = (changeEvent) => {
        const textBox = changeEvent.target as HTMLInputElement
        const query = textBox.value.trim()
        if (!query.match(/[0-9].*/)) return
        console.log('event fired, function called: input: '+query)
        // the geographical location to bias search results towards
        let LOCATION: google.maps.LatLng = new google.maps.LatLng(50.73790969615289, -3.535053172263085)
        // the distance from the above location (3km)
        const RADIUS: number = 3_000
        const CITY_NAME: string = "Exeter"
        const COUNTRY_NAME: string = "UK"

        const autocompleteSessionToken: google.maps.places.AutocompleteSessionToken = new google.maps.places.AutocompleteSessionToken()
        const autocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService
        const autocompletions: IAddressSuggestion[] = []
        const queryRequest: google.maps.places.AutocompletionRequest = {
            input: query, location: LOCATION, radius: RADIUS, types: ['address'],
            sessionToken: autocompleteSessionToken, origin: LOCATION
        }
        autocomplete.getPlacePredictions(
            queryRequest,
            (predictions, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) console.error(status)
                else {
                    predictions.forEach(prediction => {
                        // if statement filters to only keep addresses in CITY_NAME, COUNTRY_NAME
                        if (prediction.terms[prediction.terms.length - 1].value === COUNTRY_NAME
                            && prediction.terms[prediction.terms.length - 2].value === CITY_NAME) {
                            console.log(`${prediction.structured_formatting.main_text} is ${prediction.distance_meters}m from the university`)
                            let address: IAddressSuggestion = {
                                "address": prediction.structured_formatting.main_text,
                                "id": prediction.place_id,
                                "distance-from-uni": prediction.distance_meters,
                                autocompleteSessionToken: autocompleteSessionToken
                            }
                            autocompletions.push(address)
                        }
                    })
                }
                ReactDOM.render(DisplaySuggestions(autocompletions), document.getElementById('search-suggestions'))
            })
    }
    const searchBox = document.querySelector("input[type=text].search-box") as HTMLInputElement
    searchBox.addEventListener('keyup', getAddressSuggestions)
    searchBox.onkeyup = () => {console.log("Changed detected")}
    console.log("Callback function finished. Event listener: ")
}


