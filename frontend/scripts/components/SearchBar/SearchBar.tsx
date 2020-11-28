import * as React from "react"
import {ChangeEvent, useEffect, useState} from "react"
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {DisplaySuggestions} from "./DisplaySuggestions";

export const SearchBar: () => JSX.Element = () => {
    const [needsEventListener, setNeedsEventListener] = useState(false)
    // on each render, it checks the google object, and if it changes (from undefined to object)
    // then it will add the event listener, otherwise not
    useEffect(() => {
        if (needsEventListener)
            return
        else if (typeof google != 'undefined') {
            setNeedsEventListener(true)
        }
    }, [typeof google])

    // this state variable stores the search predictions based on the users input
    const [suggestions, setSuggestions] = useState<IAddressSuggestion[]>([])

    // this function takes a change event, captures the query and updates the suggestions state variable
    const getAddressSuggestions: (changeEvent: ChangeEvent<HTMLInputElement>) => void = (changeEvent) => {
        const query = changeEvent.target.value.trim()
        if (!query.match(/[0-9].*/)) return
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
                            let address: IAddressSuggestion = {
                                secondaryAddress: prediction.structured_formatting.secondary_text,
                                "address": prediction.structured_formatting.main_text,
                                "id": prediction.place_id,
                                "distance-from-uni": prediction.distance_meters,
                                autocompleteSessionToken: autocompleteSessionToken
                            }
                            autocompletions.push(address)
                        }
                    })
                }
                setSuggestions(autocompletions)
            })
    }

    return (
        <div>
            <div id={"search-box-wrapper"}>
                <input type={"text"} placeholder={"Street address"}
                       inputMode={"search"} className={"search-box"}
                       onChange={needsEventListener ?
                           getAddressSuggestions
                           :
                           attemptToReloadGoogleMaps}
                />
            </div>
            <>
                <div id={"search-suggestions"}>
                    <DisplaySuggestions suggestions={suggestions}/>
                </div>
            </>
        </div>
    )
}

const attemptToReloadGoogleMaps = () => {
    console.log(`Google has not yet loaded, appending script tag...`)
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJ-iWesbnnGXaDjKvGhlKB9G10odKSEOI&libraries=places'
    document.querySelector('head').appendChild(scriptTag)
}
