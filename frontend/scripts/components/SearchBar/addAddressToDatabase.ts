import {IAddress} from "../../types/IAddress";
import firebase from "firebase/app";
import 'firebase/database'
import {IAddressSuggestion} from "../../types/IAddressSuggestion";

export const addAddressToDatabase = (addressSuggestion: IAddressSuggestion) => {
    //strip '.' characters due to firebase restrictions
    const houseReference = firebase.database().ref("/houses").child(addressSuggestion.address.replace('.', ''))
    console.log("Attempting to add to the database...")
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {
        placeId: addressSuggestion.id,
        fields: ['address_components'],
        sessionToken: addressSuggestion.autocompleteSessionToken
    }
    const placeService = new google.maps.places.PlacesService(document.getElementById("google-maps-attribution") as HTMLDivElement);
    let address: IAddress = {
        primary_address: addressSuggestion.address,
        place_id: addressSuggestion.id,
        distance_from_uni: addressSuggestion["distance-from-uni"],
        secondary_address: addressSuggestion.secondaryAddress,
        terms: {}
    }
    placeService.getDetails(placeDetailsRequest, (result, status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Did not manage to retrieve map data...")
            return;
        }
        // if status is OK
        // console.log("After being selected to be added to the database, these further details were returned: ")
        // console.log(result.address_components)
        // This will only happen on the addresses whose pages are viewed, not on all that are autocompleted
        result.address_components.forEach(component => {
            if (component.types.includes('postal_code') &&
                component.long_name.match(/^EX[0-6] [0-9][A-Z]{2}$/))
                address.terms.post_code = component.long_name
            else if (component.types.includes('street_number'))
                address.terms.street_number = Number(component.long_name)
            else if (component.types.includes('route'))
                address.terms.street = component.long_name
            else if (component.types.includes('postal_town'))
                address.terms.town = component.long_name
            else if (component.types.includes("administrative_area_level_2"))
                address.terms.county = component.long_name
            else if (component.types.includes("administrative_area_level_1"))
                address.terms.region = component.long_name
            else if (component.types.includes("country"))
                address.terms.country = component.long_name
        })

        // if the data is already written to the database, it will be overwritten
        // every visit by every user will overwrite existing data (for performance reasons)
        // send the collected data to the database
        // let routerHistory = useHistory()
        houseReference.set(address)
            .then(() => console.log(`Added ${addressSuggestion.address} to database:`))
            .then(() => console.log(address))
    })
}
