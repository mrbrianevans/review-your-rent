import * as React from "react";
import {IAddress} from "../types/IAddress";
import firebase from "firebase";


// the geographical location to bias search results towards
const LOCATION: google.maps.LatLng = new google.maps.LatLng(50.73790969615289, -3.535053172263085)
// the distance from the above location (3km)
const RADIUS: number = 3_000
const CITY_NAME: string = "Exeter"
const COUNTRY_NAME: string = "UK"

export const SearchBar: () => JSX.Element = () => {

    return (
        <input type={"text"} placeholder={"Street address"} inputMode={"search"} onChange={
            (newQuery) => {
                console.log("Now searching for property " + newQuery.target.value)
                tempSearchPrediction(newQuery.target.value)

            }
        } className={"search-box"}/>
    )
}

// const searchPrediction: (query: string) => Promise<string[]> = (query) => {
//     // if(google===undefined){
//     //     console.log("You need to import Google")
//     //     return false
//     // }
//     const autocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService
//     // const autocompletions:string[] = []
//     const queryRequest = { input: query, location: LOCATION, radius: RADIUS }
//     const autocompletePromise = promisify<google.maps.places.AutocompletionRequest,
//         (google.maps.places.AutocompletePrediction[])>(autocomplete.getPlacePredictions)
//
//     return autocompletePromise(queryRequest)
//         .then((predictions, status)=>{
//             const autocompletions:string[] = []
//             predictions.forEach(prediction=>{
//                 console.log(`Prediction: ${prediction.structured_formatting.main_text}`)
//                 autocompletions.push(prediction.structured_formatting.main_text)
//             })
//             return autocompletions
//         })
// }

const tempSearchPrediction: (query: string) => void = (query) => {
    const autocomplete: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService
    const autocompletions: string[] = []
    const queryRequest = {input: query, location: LOCATION, radius: RADIUS, types: ['address']}
    const returnedAddresses: IAddress[] = []
    autocomplete.getPlacePredictions(
        queryRequest,
        (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) console.error(status)
            else {
                predictions.forEach(prediction => {

                    // console.log(`\nPrediction: ${prediction.structured_formatting.main_text}, secondary text: ${prediction.structured_formatting.secondary_text}`)
                    // console.log(`Terms: ${JSON.stringify(prediction.terms)}`)
                    // console.log(`Types: ${JSON.stringify(prediction.types)}`)
                    // console.log(`Distance: ${JSON.stringify(prediction.distance_meters)}`)
                    // console.log(`Reference: ${JSON.stringify(prediction.reference)}`)
                    // console.log(`ID: ${JSON.stringify(prediction.place_id)}\n`)

                    if (prediction.terms[prediction.terms.length - 1].value === COUNTRY_NAME
                        && prediction.terms[prediction.terms.length - 2].value === CITY_NAME) {
                        console.log("This matches the criteria to be entered into the database\n\n\n")
                        let address: IAddress = {
                            "street-address": prediction.structured_formatting.main_text,
                            "secondary-address": prediction.structured_formatting.secondary_text,
                            reference: prediction.place_id,
                            terms: prediction.terms.map((predictionTerm) => predictionTerm.value)
                        }
                        console.log(address)
                        returnedAddresses.push(address)
                    }
                    autocompletions.push(prediction.structured_formatting.main_text)
                })
                addAddressesToDatabase(returnedAddresses)
            }
            return autocompletions
        })
}


const addAddressesToDatabase = (addresses: IAddress[]) => {
    const housesRef = firebase.database().ref("/houses")
    addresses.forEach(address => {
        housesRef.child(address["street-address"]).set(address)
            .then(() => console.log(`Added ${address["street-address"]} to database`))
        // set the houseReference to the address object in the database
    })
}
