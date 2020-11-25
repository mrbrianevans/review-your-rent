import * as React from "react"
import {useState} from "react"
import {IAddress} from "../types/IAddress"
import firebase from "firebase/app"
import 'firebase/database'
import {Link} from 'react-router-dom'

// TODO: This whole component should only ever be loaded in AFTER google maps api has loaded

// the geographical location to bias search results towards
let LOCATION: google.maps.LatLng
if (!google) // this should check if google is defined yet?
    LOCATION = new google.maps.LatLng(50.73790969615289, -3.535053172263085)
// the distance from the above location (3km)
const RADIUS: number = 3_000
const CITY_NAME: string = "Exeter"
const COUNTRY_NAME: string = "UK"

export const SearchBar: () => JSX.Element = () => {
    const [suggestions, setSuggestions] = useState<IAddress[]>()
    const autocompleteSessionToken: google.maps.places.AutocompleteSessionToken = new google.maps.places.AutocompleteSessionToken()
    const getAddressSuggestions: (query: string) => void = (query) => {
        query = query.trim()
        if (!query.match(/[0-9].*/)) return
        const autocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService
        const autocompletions: IAddress[] = []
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
                        if (prediction.terms[prediction.terms.length - 1].value === COUNTRY_NAME
                            && prediction.terms[prediction.terms.length - 2].value === CITY_NAME) {
                            console.log(`${prediction.distance_meters}m from the university`)
                            let address: IAddress = {
                                "street-address": prediction.structured_formatting.main_text,
                                "secondary-address": prediction.structured_formatting.secondary_text,
                                "place-id": prediction.place_id,
                                terms: prediction.terms.map((predictionTerm) => predictionTerm.value),
                                "distance-from-uni": prediction.distance_meters
                            }
                            autocompletions.push(address)
                        } else {
                            // console.log("Invalid address discarded")
                        }
                    })
                }
                setSuggestions(autocompletions)
            })
    }
    return (
        <div>
            <div id={"search-box-wrapper"}>
                <input type={"text"} placeholder={"Street address"} inputMode={"search"} onChange={
                    (newQuery) => {
                        console.log("Now searching for property " + newQuery.target.value)
                        getAddressSuggestions(newQuery.target.value)

                    }
                } className={"search-box"}/>
            </div>
            <div id={"search-suggestions"}>
                {suggestions?.map((suggestion, index) =>
                    <span key={index} className={"search-suggestion"} onClick={
                        () => {
                            addAddressToDatabase(suggestion, autocompleteSessionToken)
                        }
                    }>
                        <Link to={`/property/${suggestion["street-address"]}`}>
                            {suggestion["street-address"]}
                        </Link>
                    </span>
                )}
            </div>
            {suggestions && <div id={"google-maps-attribution"}/>}
        </div>

    )
}


const addAddressToDatabase = (address: IAddress,
                              sessionToken: google.maps.places.AutocompleteSessionToken) => {
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {
        placeId: address["place-id"],
        fields: ['address_components'],
        sessionToken: sessionToken
    }
    const placeService = new google.maps.places.PlacesService(document.getElementById("google-maps-attribution") as HTMLDivElement);

    placeService.getDetails(placeDetailsRequest, (result, status) => {
        // if status is OK
        console.log("After being selected to be added to the database, these further details were returned: ")
        console.log(result.address_components)
        //TODO: Get all the terms from address components and put them in terms of IAddress and save them to database
        // This will only happen on the addresses whose pages are viewed, not on all that are autocompleted
        result.address_components.forEach(component => {
            if (component.types.includes('postal_code')) {
                if (component.long_name.match(/^EX[0-6] [0-9][A-Z]{2}$/)) {
                    address['post-code'] = component.long_name
                    console.log(`Post code is: ${component.long_name}`)
                }
            }
        })
        firebase.database().ref("/houses").child(address["street-address"])
            .set(address)
            .then(() => console.log(`Added ${address["street-address"]} to database`))
    })

}
