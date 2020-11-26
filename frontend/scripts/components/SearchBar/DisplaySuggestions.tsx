import * as React from "react";
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {addAddressToDatabase} from "./addAddressToDatabase";

export const DisplaySuggestions: (suggestions: IAddressSuggestion[]) => JSX.Element = suggestions =>
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

