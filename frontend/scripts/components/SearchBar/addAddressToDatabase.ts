import {IAddress} from "../../types/IAddress";
import firebase from "firebase/app";
import 'firebase/database'
import {IAddressSuggestion} from "../../types/IAddressSuggestion";

export const addAddressToDatabase = (addressSuggestion: IAddressSuggestion,
                              sessionToken: google.maps.places.AutocompleteSessionToken) => {
    console.log("Attempting to add to the database...")
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {
        placeId: addressSuggestion.id,
        fields: ['address_components'],
        sessionToken: sessionToken
    }
    const placeService = new google.maps.places.PlacesService(document.getElementById("google-maps-attribution") as HTMLDivElement);
    let address: IAddress
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

        firebase.database().ref("/houses").child(addressSuggestion.address)
            .set(address)
            .then(() => console.log(`Added ${addressSuggestion.address} to database`))
    })

}
