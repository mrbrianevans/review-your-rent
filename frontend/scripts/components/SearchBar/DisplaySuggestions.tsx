import * as React from "react";
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {addAddressToDatabase} from "./addAddressToDatabase";
import {Link} from 'react-router-dom'
// this component renders the search suggestions. Props: {suggestions: []}.
export const DisplaySuggestions: (props: { suggestions?: IAddressSuggestion[] }) => JSX.Element = props =>
    <>
        {props.suggestions?.map((suggestion, index) =>
            <span key={index} className={"search-suggestion"} onClick={
                () => {
                    addAddressToDatabase(suggestion) // this auto redirects
                }
            }>
                        <Link to={`/property/${suggestion.address}`}>
                        {suggestion.address}
                    </Link>

                {/*    <a href={`/property/${suggestion.address}`}>{suggestion.address}</a>*/}

                {/*{suggestion.address}*/}

                    </span>
        )}
        {props.suggestions && <div id={"google-maps-attribution"}/>}
    </>

