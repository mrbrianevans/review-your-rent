import * as React from "react"
import {useState} from "react"
import {IAddress} from "../types/IAddress"
import firebase from "firebase/app"
import 'firebase/database'
import {Link} from 'react-router-dom'

// the geographical location to bias search results towards
const LOCATION: google.maps.LatLng = new google.maps.LatLng(50.73790969615289, -3.535053172263085)
// the distance from the above location (3km)
const RADIUS: number = 3_000
const CITY_NAME: string = "Exeter"
const COUNTRY_NAME: string = "UK"

export const SearchBar: () => JSX.Element = () => {
    const [suggestions, setSuggestions] = useState<IAddress[]>()
    const getAddressSuggestions: (query: string) => void = (query) => {
        query = query.trim()
        if (!query.match(/[0-9].*/)) return
        const autocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService
        const autocompletions: IAddress[] = []
        const queryRequest = {input: query, location: LOCATION, radius: RADIUS, types: ['address']}
        autocomplete.getPlacePredictions(
            queryRequest,
            (predictions, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) console.error(status)
                else {
                    predictions.forEach(prediction => {
                        if (prediction.terms[prediction.terms.length - 1].value === COUNTRY_NAME
                            && prediction.terms[prediction.terms.length - 2].value === CITY_NAME) {
                            let address: IAddress = {
                                "street-address": prediction.structured_formatting.main_text,
                                "secondary-address": prediction.structured_formatting.secondary_text,
                                reference: prediction.place_id,
                                terms: prediction.terms.map((predictionTerm) => predictionTerm.value)
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
                            addAddressToDatabase(suggestion)
                        }
                    }>
                        <Link to={`/property/${suggestion["street-address"]}`}>
                            {suggestion["street-address"]}
                        </Link>
                    </span>
                )}
            </div>
        </div>

    )
}


const addAddressesToDatabase = (addresses: IAddress[]) => {
    const housesRef = firebase.database().ref("/houses")
    addresses.forEach(address => {
        housesRef.child(address["street-address"]).set(address)
            .then(() => console.log(`Added ${address["street-address"]} to database`))
        // set the houseReference to the address object in the database
    })
}

const addAddressToDatabase = (address: IAddress) => {
    firebase.database().ref("/houses").child(address["street-address"])
        .set(address)
        .then(() => console.log(`Added ${address["street-address"]} to database`))
}
