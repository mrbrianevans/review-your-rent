import * as React from "react";
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {addAddressToDatabase} from "./addAddressToDatabase";
import {Link} from 'react-router-dom'

export const DisplaySuggestions: (suggestions: IAddressSuggestion[]) => JSX.Element = suggestions => {
    console.log("Suggestions should be being displayed")
    return(
        <>
                {suggestions?.map((suggestion, index) =>
                    <span key={index} className={"search-suggestion"} onClick={
                        () => {
                            addAddressToDatabase(suggestion, suggestion.autocompleteSessionToken)
                        }
                    }>
                        {/*<Link to={`/property/${suggestion.address}`}>*/}
                        {/*    {suggestion.address}*/}
                        {/*</Link>*/}
                        <a href={`/property/${suggestion.address}`}>{suggestion.address}</a>
                    </span>
                )}
                {suggestions && <div id={"google-maps-attribution"}/>}
            </>
    )
}
