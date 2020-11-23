import * as React from "react";
// import {promisify} from 'util'

// the geographical location to bias search results towards
const LOCATION: google.maps.LatLng = new google.maps.LatLng(50.73790969615289, -3.535053172263085)
// the distance from the above location (3km)
const RADIUS: number = 3_000

export const SearchBar: () => JSX.Element = () => {

    return (
        <input type={"text"} placeholder={"Street address"} inputMode={"search"} onChange={
            (newQuery) => {
                console.log("Now searching for property " + newQuery.target.value)
                tempSearchPrediction(newQuery.target.value)

            }
        } className={"search-box"} autoFocus/>
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
    const queryRequest = {input: query, location: LOCATION, radius: RADIUS}
    autocomplete.getPlacePredictions(
        {input: query, location: LOCATION, radius: RADIUS},
        (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) console.error(status)
            else predictions.forEach(prediction => {
                console.log(`Prediction: ${prediction.structured_formatting.main_text}`)
                autocompletions.push(prediction.structured_formatting.main_text)
            })
            return autocompletions
        })
}
